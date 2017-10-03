import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/common/base";
import { SpreadSheetActionService, SheetViewDispatcherService, SheetViewAction, SpreadSheetStoreService, SpreadSheetDispatcherService, SpreadSheetAction, SheetViewActionService } from "app/spread-sheet/services";
import { Sheet, Column, Row, Cell, SpreadSheetConsts, SelectedCellPosition, SheetView } from "app/spread-sheet";
import { s, _ } from "app";

@Injectable()
export class SheetViewStoreService extends Emitter<Payload> {

  static EVENT_PREFIX: string = "SheetViewStoreService.";
  static UPDATE_EVENT: string = SheetViewStoreService.EVENT_PREFIX + "update";

  private _sheet: Sheet;

  private _viewWidth: number;

  private _viewHeight: number;

  private _cellPosTopList: number[];

  private _cellPosLeftList: number[];

  private _sheetViewWidth: number;

  private _sheetViewHeight: number;

  private _textRuler: createjs.Text = new createjs.Text();

  private _textMetricsCache: { [colIndex: number]: { [rowIndex: number]: { height: number, width: number } } } = {};

  constructor(
    private sheetViewDispatcherService: SheetViewDispatcherService,
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService
  ) {
    super();

    this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SpreadSheetActionService.SELECT_SHEET_EVENT:
            this.selectSheet(<SpreadSheetAction.SelectSheet>payload.data);
            break;
          case SpreadSheetActionService.SELECT_CELL_EVENT:
            this.selectCell(<SpreadSheetAction.SelectCell>payload.data);
            break;
        }
      }
    );

    this.sheetViewDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetViewActionService.CHANGE_SIZE_EVENT:
            this.changeSheetViewSize(<SheetViewAction.ChangeSheetViewSize>payload.data);
            break;
          case SheetViewActionService.SCROLL_EVENT:
            this.scrollSheetView(<SheetViewAction.ScrollSheet>payload.data);
            break;
        }
      }
    );
  }

  get sheetName(): string {
    if (!this.isLoadedSheet()) {
      return null;
    }
    return this._sheet.name;
  }

  get sheetViewColumnList(): number[] {
    if (!this.isLoadedSheet()) {
      return [];
    }
    return this._sheet.sheetView.sheetViewColumnList;
  }

  get sheetViewRowList(): number[] {
    if (!this.isLoadedSheet()) {
      return [];
    }
    return this._sheet.sheetView.sheetViewRowList;
  }

  get cellPosTopList(): number[] {
    return this._cellPosTopList;
  }

  get cellPosLeftList(): number[] {
    return this._cellPosLeftList;
  }

  get viewWidth(): number {
    return this._viewWidth;
  }

  get viewHeight(): number {
    return this._viewHeight;
  }

  get viewScrollTop(): number {
    if (!this.isLoadedSheet()) {
      return 0;
    }
    return this._sheet.sheetView.viewScrollTop;
  }

  get viewScrollLeft(): number {
    if (!this.isLoadedSheet()) {
      return 0;
    }
    return this._sheet.sheetView.viewScrollLeft;
  }

  get areaWidth(): number {
    if (!this.isLoadedSheet()) {
      return 0;
    }
    return this._sheet.sheetView.areaWidth;
  }

  get areaHeight(): number {
    if (!this.isLoadedSheet()) {
      return 0;
    }
    return this._sheet.sheetView.areaHeight;
  }

  get sheetViewWidth(): number {
    return this._sheetViewWidth;
  }

  get sheetViewHeight(): number {
    return this._sheetViewHeight;
  }

  get sheetViewTop(): number {
    if (!this.isLoadedSheet()) {
      return 0;
    }
    return this._sheet.sheetView.sheetViewTop;
  }

  get sheetViewLeft(): number {
    if (!this.isLoadedSheet()) {
      return 0;
    }
    return this._sheet.sheetView.sheetViewLeft;
  }

  get selectedCellPos(): SelectedCellPosition {
    if (!this.isLoadedSheet()) {
      return null;
    }
    return this._sheet.sheetView.selectedCellPosition;
  }

  isLoadedSheet(): boolean {
    if (!this._sheet) {
      return false;
    }
    return true;
  }

  getColumn(colIndex: number): Column {
    var col: Column = this._sheet.columns[colIndex];
    if (!col) {
      return this._sheet.defaultColumn;
    }
    return col;
  }

  getRow(rowIndex: number): Row {
    var row: Row = this._sheet.rows[rowIndex];
    if (!row) {
      return this._sheet.defaultRow;
    }
    return row;
  }

  getCell(colIndex: number, rowIndex: number): Cell {
    var rowObj: { [rowIndex: number]: Cell } = this._sheet.cells[colIndex];

    if (!rowObj) {
      return this._sheet.defaultCell;
    }

    var cell: Cell = rowObj[rowIndex];
    if (!cell) {
      return this._sheet.defaultCell;
    }

    return cell;
  }

  getTextMetrics(colIndex: number, rowIndex: number, updateCache: boolean = false): { height: number, width: number } {
    var colObj: { [rowIndex: number]: { height: number, width: number } } = this._textMetricsCache[colIndex];
    if (!updateCache && colObj) {
      var metrics: { height: number, width: number } = colObj[rowIndex];
      if (metrics) {
        return metrics;
      }
    }

    var newMetrics: { height: number, width: number };
    var cell: Cell = this.getCell(colIndex, rowIndex);

    if (cell.value === null) {
      newMetrics = { height: 0, width: 0 };
      if (colObj) {
        delete colObj[rowIndex];
      }
      return newMetrics;
    }

    var height: number = 0;
    var width: number = 0;
    this._textRuler.font = cell.font.toString();
    var values: string[] = cell.value.split("\n");
    _.forEach(values, (v) => {
      this._textRuler.text = v;
      var metrics: any = this._textRuler.getMetrics();
      height += metrics.height;
      if (width < metrics.width) {
        width = metrics.width;
      }
    });
    newMetrics = { height: height, width: width };

    if (!colObj) {
      colObj = {};
      this._textMetricsCache[colIndex] = colObj;
    }
    colObj[rowIndex] = newMetrics;

    return newMetrics;
  }

  private changeSheetViewSize(action: SheetViewAction.ChangeSheetViewSize) {
    this._viewWidth = action.width;
    this._viewHeight = action.height;

    if (!this.isLoadedSheet()) {
      return;
    }
    
    if (!this._sheet.sheetView.areaHeight || !this._sheet.sheetView.areaWidth) {
      this.initAreaRect();
    }
    this.updateCellRange();

    this.emit({ eventType: SheetViewStoreService.UPDATE_EVENT });
  }

  private initAreaRect() {
    this.initEdgeIndex();
    this._sheet.sheetView.areaHeight = 0;
    this._sheet.sheetView.areaWidth = 0;

    var col: Column;
    for (var colIdx: number = 1; colIdx <= this._sheet.sheetView.edgeColIndex; colIdx++) {
      col = this._sheet.columns[colIdx];
      if (col) {
        this._sheet.sheetView.areaWidth += col.width;
      } else {
        this._sheet.sheetView.areaWidth += this._sheet.defaultColumn.width;
      }
    }

    var row: Row;
    for (var rowIdx: number = 1; rowIdx <= this._sheet.sheetView.edgeRowIndex; rowIdx++) {
      row = this._sheet.rows[rowIdx];
      if (row) {
        this._sheet.sheetView.areaHeight += row.height;
      } else {
        this._sheet.sheetView.areaHeight += this._sheet.defaultRow.height;
      }
    }
  }

  private initEdgeIndex() {
    this._sheet.sheetView.edgeColIndex = 1;
    this._sheet.sheetView.edgeRowIndex = 1;

    var i: number;

    var colIndexes: string[] = Object.keys(this._sheet.columns);
    for (var colIdx of colIndexes) {
      i = Number(colIdx);
      if (this._sheet.sheetView.edgeColIndex < i) {
        this._sheet.sheetView.edgeColIndex = i;
      }
    }

    var rowIndexes: string[] = Object.keys(this._sheet.rows);
    for (var rowIdx of rowIndexes) {
      i = Number(rowIdx);
      if (this._sheet.sheetView.edgeRowIndex < i) {
        this._sheet.sheetView.edgeRowIndex = i;
      }
    }

    var colIndexes: string[] = Object.keys(this._sheet.cells);
    for (var colIdx of colIndexes) {
      i = Number(colIdx);
      if (this._sheet.sheetView.edgeColIndex < i) {
        this._sheet.sheetView.edgeColIndex = i;
      }

      var rowIndexes: string[] = Object.keys(this._sheet.cells[i]);
      for (var rowIdx of rowIndexes) {
        i = Number(rowIdx);
        if (this._sheet.sheetView.edgeRowIndex < i) {
          this._sheet.sheetView.edgeRowIndex = i;
        }
      }
    }
  }

  private updateCellRange() {
    this._sheetViewWidth = 0;
    this._sheetViewHeight = 0;
    for (var colNum of this.sheetViewColumnList) {
      this._sheetViewWidth += this.getColumn(colNum).width;
    }
    for (var rowNum of this.sheetViewRowList) {
      this._sheetViewHeight += this.getRow(rowNum).height;
    }

    this.addBottomRow();
    this.addRightColumn();
    this.updateCellPos();
  }

  private scrollSheetView(action: SheetViewAction.ScrollSheet) {
    this._sheet.sheetView.viewScrollTop = action.scrollTop;
    this._sheet.sheetView.viewScrollLeft = action.scrollLeft;

    if (this._sheet.sheetView.viewScrollTop - this._sheet.sheetView.sheetViewTop <= 0) {
      this.addTopRow();
      this.removeBottomRow();
    } else if ((this._sheet.sheetView.sheetViewTop + this._sheetViewHeight) - (this._sheet.sheetView.viewScrollTop + this._viewHeight) <= 0) {
      this.addBottomRow();
      this.removeTopRow();
    }
    if (this._sheet.sheetView.viewScrollLeft - this._sheet.sheetView.sheetViewLeft <= 0) {
      this.addLeftColumn();
      this.removeRightColumn();
    } else if ((this._sheet.sheetView.sheetViewLeft + this._sheetViewWidth) - (this._sheet.sheetView.viewScrollLeft + this._viewWidth) <= 0) {
      this.addRightColumn();
      this.removeLeftColumn();
    }

    this.updateCellPos();

    this.emit({ eventType: SheetViewStoreService.UPDATE_EVENT });
  }

  private addTopRow() {
    var row: Row;

    for (var rowIdx: number = this._sheet.sheetView.sheetViewRowList[0] - 1; rowIdx >= 1; rowIdx--) {
      row = this.getRow(rowIdx);
      this._sheetViewHeight += row.height;
      this._sheet.sheetView.sheetViewTop -= row.height;
      this._sheet.sheetView.sheetViewRowList.unshift(rowIdx);
      if (this._sheet.sheetView.viewScrollTop - this._sheet.sheetView.sheetViewTop > 0) {
        break;
      }
    }
  }

  private removeBottomRow() {
    var row: Row;
    var rowIdx: number = null;
    var rowHeight: number = null;
    while ((this._sheet.sheetView.sheetViewTop + this._sheetViewHeight) - (this._sheet.sheetView.viewScrollTop + this._viewHeight) > 0) {
      rowIdx = this._sheet.sheetView.sheetViewRowList.pop();
      row = this.getRow(rowIdx);
      rowHeight = row.height;
      this._sheetViewHeight -= rowHeight;
      if (this._sheet.sheetView.sheetViewRowList.length === 0) {
        break;
      }
    }
    if (rowIdx) {
      this._sheet.sheetView.sheetViewRowList.push(rowIdx);
      this._sheetViewHeight += rowHeight;
    }
  }

  private removeTopRow() {
    var row: Row;
    var rowIdx: number = null;
    var rowHeight: number = null;

    while (this._sheet.sheetView.viewScrollTop - this._sheet.sheetView.sheetViewTop > 0) {
      rowIdx = this._sheet.sheetView.sheetViewRowList.shift();
      row = this.getRow(rowIdx);
      rowHeight = row.height;
      this._sheetViewHeight -= rowHeight;
      this._sheet.sheetView.sheetViewTop += rowHeight;
      if (this._sheet.sheetView.sheetViewRowList.length === 0) {
        break;
      }
    }
    if (rowIdx) {
      this._sheet.sheetView.sheetViewRowList.unshift(rowIdx);
      this._sheetViewHeight += rowHeight;
      this._sheet.sheetView.sheetViewTop -= rowHeight;
    }
  }

  private addBottomRow() {
    var row: Row;

    for (var rowIdx: number = this._sheet.sheetView.sheetViewRowList[this._sheet.sheetView.sheetViewRowList.length - 1] + 1; rowIdx <= SpreadSheetConsts.MAX_ROW_NUM; rowIdx++) {
      row = this.getRow(rowIdx);
      this._sheetViewHeight += row.height;
      this._sheet.sheetView.sheetViewRowList.push(rowIdx);
      if ((this._sheet.sheetView.sheetViewTop + this._sheetViewHeight) - (this._sheet.sheetView.viewScrollTop + this._viewHeight) > 0) {
        break;
      }
    }
  }

  private addLeftColumn() {
    var col: Column;

    for (var colIdx: number = this._sheet.sheetView.sheetViewColumnList[0] - 1; colIdx >= 1; colIdx--) {
      col = this.getColumn(colIdx);
      this._sheetViewWidth += col.width;
      this._sheet.sheetView.sheetViewLeft -= col.width;
      this._sheet.sheetView.sheetViewColumnList.unshift(colIdx);
      if (this._sheet.sheetView.viewScrollLeft - this._sheet.sheetView.sheetViewLeft > 0) {
        break;
      }
    }
  }

  private removeRightColumn() {
    var col: Column;
    var colIdx: number = null;
    var colWidth: number = null;

    while ((this._sheet.sheetView.sheetViewLeft + this._sheetViewWidth) - (this._sheet.sheetView.viewScrollLeft + this._viewWidth) > 0) {
      colIdx = this._sheet.sheetView.sheetViewColumnList.pop();
      col = this.getColumn(colIdx);
      colWidth = col.width;
      this._sheetViewWidth -= colWidth;
      if (this._sheet.sheetView.sheetViewColumnList.length === 0) {
        break;
      }
    }
    if (colIdx) {
      this._sheet.sheetView.sheetViewColumnList.push(colIdx);
      this._sheetViewWidth += colWidth;
    }
  }

  private addRightColumn() {
    var col: Column;

    for (var colIdx: number = this._sheet.sheetView.sheetViewColumnList[this._sheet.sheetView.sheetViewColumnList.length - 1] + 1; colIdx <= SpreadSheetConsts.MAX_COLUMN_NUM; colIdx++) {
      col = this.getColumn(colIdx);
      this._sheetViewWidth += col.width;
      this._sheet.sheetView.sheetViewColumnList.push(colIdx);
      if ((this._sheet.sheetView.sheetViewLeft + this._sheetViewWidth) - (this._sheet.sheetView.viewScrollLeft + this._viewWidth) > 0) {
        break;
      }
    }
  }

  private removeLeftColumn() {
    var col: Column;
    var colIdx: number = null;
    var colWidth: number = null;

    while (this._sheet.sheetView.viewScrollLeft - this._sheet.sheetView.sheetViewLeft > 0) {
      colIdx = this._sheet.sheetView.sheetViewColumnList.shift();
      col = this.getColumn(colIdx);
      colWidth = col.width;
      this._sheetViewWidth -= colWidth;
      this._sheet.sheetView.sheetViewLeft += colWidth;
      if (this._sheet.sheetView.sheetViewColumnList.length === 0) {
        break;
      }
    }
    if (colIdx) {
      this._sheet.sheetView.sheetViewColumnList.unshift(colIdx);
      this._sheetViewWidth += colWidth;
      this._sheet.sheetView.sheetViewLeft -= colWidth;
    }
  }

  private updateCellPos() {
    this._cellPosLeftList = [];
    this._cellPosTopList = [];

    var topSum: number = 0;
    for (var rowNum of this._sheet.sheetView.sheetViewRowList) {
      this._cellPosTopList.push(topSum);
      topSum += this.getRow(rowNum).height;
    }

    var leftSum: number = 0;
    for (var colNum of this._sheet.sheetView.sheetViewColumnList) {
      this._cellPosLeftList.push(leftSum);
      leftSum += this.getColumn(colNum).width;
    }
  }

  private selectSheet(action: SpreadSheetAction.SelectSheet) {
    this.spreadSheetDispatcherService.waitFor([this.spreadSheetStoreService.spreadSheetDispatcherId]);
    this._sheet = this.spreadSheetStoreService.selectedSheet;
    
    if (!this._sheet.sheetView.areaHeight || !this._sheet.sheetView.areaWidth) {
      this.initAreaRect();
    }
    this.updateCellRange();
    
    this.emit({ eventType: SheetViewStoreService.UPDATE_EVENT });
  }

  private selectCell(action: SpreadSheetAction.SelectCell) {
    this.spreadSheetDispatcherService.waitFor([this.spreadSheetStoreService.spreadSheetDispatcherId]);
    this.emit({ eventType: SheetViewStoreService.UPDATE_EVENT });
  }

}

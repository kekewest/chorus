import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/common/base";
import { SpreadSheet, Sheet, Column, Row, Cell, RGBAColor, SelectedCellPosition } from "app/spread-sheet";
import { SpreadSheetDispatcherService, SpreadSheetAction, SpreadSheetActionService } from "app/spread-sheet/services";
import { ChorusDispatcherService } from "app/common/services";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";

@Injectable()
export class SpreadSheetStoreService extends Emitter<Payload> {

  static EVENT_PREFIX: string = "SpreadSheetStoreService.";
  static LOAD_SPREADSHEET_EVENT: string = SpreadSheetStoreService.EVENT_PREFIX + "load-spreadsheet";

  spreadSheetDispatcherId: string;

  private _spreadSheet: SpreadSheet;

  constructor(
    private chorusDispatcherService: ChorusDispatcherService,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService
  ) {
    super();
    this.spreadSheetDispatcherId = this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SpreadSheetActionService.LOAD_SPREADSHEET_EVENT:
            this.setSpreadSheet(<SpreadSheetAction.LoadSpreadSheet>payload.data);
            break;
          case SpreadSheetActionService.SELECT_SHEET_EVENT:
            this.selectSheet(<SpreadSheetAction.SelectSheet>payload.data);
            break;
          case SpreadSheetActionService.SELECT_CELL_EVENT:
            this.selectCell(<SpreadSheetAction.SelectCell>payload.data);
            break;
        }
      }
    );
  }

  get spreadSheet(): SpreadSheet {
    return this._spreadSheet;
  }

  get sheetOrder(): string[] {
    return this._spreadSheet.sheetOrder;
  }

  get selectedSheetName(): string {
    return this._spreadSheet.selectedSheetName;
  }

  get selectedSheet(): Sheet {
    return this._spreadSheet.sheets[this.selectedSheetName];
  }

  isLoadedSpreadSheet(): boolean {
    if (!this._spreadSheet) {
      return false;
    }
    return true;
  }

  setSpreadSheet(action: SpreadSheetAction.LoadSpreadSheet) {
    this._spreadSheet = action.spreadSheet;
    this.emit({ eventType: SpreadSheetStoreService.LOAD_SPREADSHEET_EVENT });
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "spread-sheet", show: false }
    });
  }

  getSpreadSheet(): SpreadSheet {
    return this._spreadSheet;
  }

  getSheet(sheetName: string): Sheet {
    return this._spreadSheet.sheets[sheetName];
  }

  getSelectedCellPosition(sheetName: string): SelectedCellPosition {
    return this._spreadSheet.sheets[sheetName].sheetView.selectedCellPosition;
  }

  setCell(sheetName: string, colIndex: number, rowIndex: number, cell: Cell) {
    var colObj: { [rowIndex: number]: Cell } = this.getColumnObject(sheetName, colIndex, true);
    colObj[rowIndex] = cell;
  }

  private getColumnObject(sheetName: string, colIndex: number, create: boolean): { [rowIndex: number]: Cell } {
    var sheet: Sheet = this.getSheet(sheetName);
    var colObj: { [rowIndex: number]: Cell } = sheet.cells[colIndex];

    if (colObj) {
      return colObj;
    }

    if (create) {
      colObj = {};
      sheet.cells[colIndex] = colObj;
      return colObj;
    }

    return null;
  }

  private selectSheet(action: SpreadSheetAction.SelectSheet) {
    this._spreadSheet.selectedSheetName = action.sheetName;
  }

  private selectCell(action: SpreadSheetAction.SelectCell) {
    this.spreadSheet.sheets[action.sheetName].sheetView.selectedCellPosition = action.selectedCellPos;
  }

}

import { Component, OnInit, HostBinding } from '@angular/core';
import { SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";
import { SelectedCellPosition, SpreadSheetConsts, RGBAColor } from "app/spread-sheet";
import { _ } from "app";

@Component({
  selector: 'wf-selected-cell-area',
  templateUrl: './selected-cell-area.component.html',
  styleUrls: ['./selected-cell-area.component.scss']
})
export class SelectedCellAreaComponent implements OnInit {

  @HostBinding('style.display')
  private _display: string = "none";

  @HostBinding('style.width.px')
  private _width: number;

  @HostBinding('style.height.px')
  private _height: number;

  @HostBinding('style.top.px')
  private _top: number;

  @HostBinding('style.left.px')
  private _left: number;

  @HostBinding('style.border-width.px')
  private _borderWidth: number = 2;

  @HostBinding('style.border-color')
  private _borderColor: string = new RGBAColor(31, 145, 243, 1).toString();

  @HostBinding('style.border-top-style')
  private _topBorderStyle: string = "solid";

  @HostBinding('style.border-left-style')
  private _leftBorderStyle: string = "solid";

  @HostBinding('style.border-bottom-style')
  private _bottomBorderStyle: string = "solid";

  @HostBinding('style.border-right-style')
  private _rightBorderStyle: string = "solid";

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  private _cellPosTopList: number[];

  private _cellPosLeftList: number[];

  private _currentPos: SelectedCellPosition;

  constructor(private sheetViewStoreService: SheetViewStoreService) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetViewStoreService.UPDATE_EVENT:
            this.updateSheetViewInfo();
            break;
        }
      }
    );
  }

  private updateSheetViewInfo() {
    this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    this._cellPosTopList = this.sheetViewStoreService.cellPosTopList;
    this._cellPosLeftList = this.sheetViewStoreService.cellPosLeftList;
    this._currentPos = this.sheetViewStoreService.selectedCellPos;
    this.show();
  }

  private isShowable(): boolean {
    if (!this._currentPos) {
      return;
    }

    if (this._currentPos.startColNum > _.last(this._sheetViewColumnList) || this._currentPos.endColNum < _.first(this._sheetViewColumnList)) {
      return false;
    }

    if (this._currentPos.startRowNum > _.last(this._sheetViewRowList) || this._currentPos.endRowNum < _.first(this._sheetViewRowList)) {
      return false;
    }

    return true;
  }

  private show() {
    if (!this.isShowable()) {
      this._display = "none";
      return;
    } else {
      this._display = "block";
    }

    this.setAreaPos();
    this.setAreaSize();
    this.setAreaBorder();
  }

  private setAreaPos() {
    if (this._currentPos.startColNum > _.first(this._sheetViewColumnList)) {
      var colNumIndex: number = this._sheetViewColumnList.indexOf(this._currentPos.startColNum);
      this._left = this._cellPosLeftList[colNumIndex] - SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
    } else {
      this._left = - SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
    }

    if (this._currentPos.startRowNum > _.first(this._sheetViewRowList)) {
      var topRowIndex: number = this._sheetViewRowList.indexOf(this._currentPos.startRowNum);
      this._top = this._cellPosTopList[topRowIndex] - SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
    } else {
      this._top = - SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
    }
  }

  private setAreaSize() {
    this._width = SpreadSheetConsts.MAX_BORDER_WIDRH;
    if (this._currentPos.startColNum < _.first(this._sheetViewColumnList)) {
      var colNum = _.first(this._sheetViewColumnList);
    } else {
      var colNum = this._currentPos.startColNum;
    }
    while (colNum <= this._currentPos.endColNum) {
      this._width += this.sheetViewStoreService.getColumn(colNum).width;
      if (colNum >= _.last(this._sheetViewColumnList)) {
        break;
      }
      colNum++;
    }

    this._height = SpreadSheetConsts.MAX_BORDER_WIDRH;
    if (this._currentPos.startRowNum < _.first(this._sheetViewRowList)) {
      var rowNum = _.first(this._sheetViewRowList);
    } else {
      var rowNum = this._currentPos.startRowNum;
    }
    while (rowNum <= this._currentPos.endRowNum) {
      this._height += this.sheetViewStoreService.getRow(rowNum).height;
      if (rowNum >= _.last(this._sheetViewRowList)) {
        break;
      }
      rowNum++;
    }
  }

  private setAreaBorder() {
    if (this._currentPos.startColNum < _.first(this._sheetViewColumnList)) {
      this._leftBorderStyle = "none";
    } else {
      this._leftBorderStyle = "solid";
    }

    if (this._currentPos.endColNum > _.last(this._sheetViewColumnList)) {
      this._rightBorderStyle = "none";
    } else {
      this._rightBorderStyle = "solid";
    }

    if (this._currentPos.startRowNum < _.first(this._sheetViewRowList)) {
      this._topBorderStyle = "none";
    } else {
      this._topBorderStyle = "solid";
    }

    if (this._currentPos.endRowNum > _.last(this._sheetViewRowList)) {
      this._bottomBorderStyle = "none";
    } else {
      this._bottomBorderStyle = "solid";
    }
  }

}

import { Component, OnInit, HostBinding } from '@angular/core';
import { SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";
import { SpreadSheetConsts } from "app/spread-sheet";

@Component({
  selector: 'wf-values-view',
  templateUrl: './values-view.component.html',
  styleUrls: ['./values-view.component.scss']
})
export class ValuesViewComponent implements OnInit {

  @HostBinding('style.width.px')
  private _sheetViewWidthStyle: number;

  @HostBinding('style.height.px')
  private _sheetViewHeightStyle: number;

  @HostBinding('style.top.px')
  private _sheetViewTop: number;

  @HostBinding('style.left.px')
  private _sheetViewLeft: number;

  sheetViewColumnList: number[];

  sheetViewRowList: number[];

  constructor(
    private sheetViewStoreService: SheetViewStoreService
  ) { }

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
    this.sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    this.sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    this._sheetViewWidthStyle = this.sheetViewStoreService.sheetViewWidth;
    this._sheetViewHeightStyle = this.sheetViewStoreService.sheetViewHeight;
    this._sheetViewTop = this.sheetViewStoreService.sheetViewTop;
    this._sheetViewLeft = this.sheetViewStoreService.sheetViewLeft;
  }

  private getTextPosTop(rowNum: number) {
    return this.sheetViewStoreService.cellPosTopList[rowNum] + SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
  }

  private getTextPosLeft(colNum: number) {
    return this.sheetViewStoreService.cellPosLeftList[colNum] + SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
  }

  private getCellHeight(rowNum: number): number {
    return this.sheetViewStoreService.getRow(rowNum).height - SpreadSheetConsts.MAX_BORDER_WIDRH;
  }

}

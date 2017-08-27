import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";
import { SpreadSheetConsts, Sheet } from "app/spread-sheet";

@Component({
  selector: 'wf-work-sheet',
  templateUrl: './work-sheet.component.html',
  styleUrls: ['./work-sheet.component.scss'],
})
export class WorkSheetComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("workSheetView")
  private _workSheetViewRef: ElementRef;

  private _workSheetViewEl: HTMLElement;

  areaWidth: number;

  areaHeight: number;

  private _scrollTop: number = 0;

  private _scrollLeft: number = 0;

  constructor(
    private sheetViewActionService: SheetViewActionService,
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

  ngAfterViewInit() {
    this._workSheetViewEl = this._workSheetViewRef.nativeElement;
    var rect: ClientRect = this._workSheetViewEl.getBoundingClientRect();
    this.sheetViewActionService.changeSheetViewSize(
      rect.width,
      rect.height
    );
  }

  ngAfterViewChecked() {
    if (this._scrollTop !== this.sheetViewStoreService.viewScrollTop) {
      this._workSheetViewEl.scrollTop = this.sheetViewStoreService.viewScrollTop;
      this._scrollTop = this.sheetViewStoreService.viewScrollTop
    }
    if (this._scrollLeft !== this.sheetViewStoreService.viewScrollLeft) {
      this._workSheetViewEl.scrollLeft = this.sheetViewStoreService.viewScrollLeft;
      this._scrollLeft = this.sheetViewStoreService.viewScrollLeft
    }
  }

  private updateSheetViewInfo() {
    if (this.sheetViewStoreService.areaWidth < this.sheetViewStoreService.viewScrollLeft + this.sheetViewStoreService.viewWidth) {
      this.areaWidth = this.sheetViewStoreService.viewScrollLeft + this.sheetViewStoreService.viewWidth * 2;
    } else {
      this.areaWidth = this.sheetViewStoreService.areaWidth + this.sheetViewStoreService.viewWidth;
    }
    if (this.sheetViewStoreService.areaHeight < this.sheetViewStoreService.viewScrollTop + this.sheetViewStoreService.viewHeight) {
      this.areaHeight = this.sheetViewStoreService.viewScrollTop + this.sheetViewStoreService.viewHeight * 2;
    } else {
      this.areaHeight = this.sheetViewStoreService.areaHeight + this.sheetViewStoreService.viewHeight;
    }
  }

  @HostListener('window:resize', ['$event'])
  private onWindowResize(e: MouseEvent) {
    var rect: ClientRect = this._workSheetViewEl.getBoundingClientRect();
    this.sheetViewActionService.changeSheetViewSize(
      rect.width,
      rect.height
    );
  }

  onScroll() {
    this._scrollTop = this._workSheetViewEl.scrollTop;
    this._scrollLeft = this._workSheetViewEl.scrollLeft;
    this.sheetViewActionService.scrollSheetView(
      this._scrollTop,
      this._scrollLeft
    );
  }

}

import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { SpreadSheetStoreService, SpreadSheetActionService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";
import { CreateNewSheetActionService } from "app/spread-sheet/services/command-actions/sheet";

@Component({
  selector: 'wf-sheet-tab',
  templateUrl: './sheet-tab.component.html',
  styleUrls: ['./sheet-tab.component.scss'],
  providers: [
    CreateNewSheetActionService
  ]
})
export class SheetTabComponent implements OnInit, AfterViewChecked {

  isLoadedSpreadSheet: boolean = false;

  sheetOrder: string[] = [];

  private _needScroll: boolean = false;

  constructor(
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private createNewSheetActionService: CreateNewSheetActionService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.spreadSheetStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SpreadSheetStoreService.LOAD_SPREADSHEET_EVENT:
            this.init();
            break;
        }
      }
    );
  }

  ngAfterViewChecked() {
    if (this._needScroll) {
      var width: number = (<HTMLElement>this.el.nativeElement).querySelector(".nav-tabs").getBoundingClientRect().width;
      (<HTMLElement>this.el.nativeElement).querySelector("tabset").scrollLeft = width;
      this._needScroll = false;
    }
  }

  init() {
    this.sheetOrder = this.spreadSheetStoreService.sheetOrder;
    this.isLoadedSpreadSheet = true;
    this.spreadSheetActionService.selectSheet(this.spreadSheetStoreService.selectedSheetName);
  }

  createNewSheet() {
    this.createNewSheetActionService.createNewSheet();
    this._needScroll = true;
  }

  selectSheet(sheetName: string) {
    if (this.isActiveTab(sheetName)) {
      return;
    }
    this.spreadSheetActionService.selectSheet(sheetName);
  }

  isActiveTab(sheetName: string): boolean {
    return sheetName === this.spreadSheetStoreService.selectedSheetName;
  }

}

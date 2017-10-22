import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";
import { SheetStoreService, SheetActionService } from "app/sheet/services";
import { EditCommandActionService } from "app/sheet/services/edit-command";
import { CreateNewTabCommand } from "app/sheet/services/edit-command/command/sheet";

@Component({
  selector: 'cr-sheet-tabs',
  templateUrl: './sheet-tabs.component.html',
  styleUrls: ['./sheet-tabs.component.scss']
})
export class SheetTabsComponent implements OnInit, AfterViewChecked {

  isLoadedSheet: boolean = false;

  tabOrder: string[] = [];

  private _needScroll: boolean = false;

  constructor(
    private sheetActionService: SheetActionService,
    private sheetStoreService: SheetStoreService,
    private editCommandActionService: EditCommandActionService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.sheetStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetStoreService.LOAD_SHEET_EVENT:
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
    this.tabOrder = this.sheetStoreService.tabOrder;
    this.isLoadedSheet = true;
    this.sheetActionService.selectTab(this.sheetStoreService.selectedTabName);
  }

  createNewTab() {
    this.editCommandActionService.invokeEditCommand(new CreateNewTabCommand());
    this._needScroll = true;
  }

  selectTab(tabName: string) {
    if (this.isActiveTab(tabName)) {
      return;
    }
    this.sheetActionService.selectTab(tabName);
  }

  isActiveTab(tabName: string): boolean {
    return tabName === this.sheetStoreService.selectedTabName;
  }

}

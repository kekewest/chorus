import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/common/base";
import { ChorusDispatcherService } from "app/common/services";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";
import { SheetDispatcherService, SheetActionService, SheetAction } from "app/sheet/services";
import { Sheet, Tab } from "app/sheet";

@Injectable()
export class SheetStoreService extends Emitter<Payload> {

  static EVENT_PREFIX: string = "SheetStoreService.";
  static LOAD_SHEET_EVENT: string = SheetStoreService.EVENT_PREFIX + "load-sheet";
  static SELECT_TAB_EVENT: string = SheetStoreService.EVENT_PREFIX + "select-tab";
  
  sheetDispatcherId: string;

  private _sheet: Sheet;

  constructor(
    private chorusDispatcherService: ChorusDispatcherService,
    private sheetDispatcherService: SheetDispatcherService
  ) {
    super();
    this.sheetDispatcherId = this.sheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetActionService.LOAD_SHEET_EVENT:
            this.setSheet(<SheetAction.LoadSheet>payload.data);
            break;
          case SheetActionService.SELECT_TAB_EVENT:
            this.selectTab(<SheetAction.SelectTab>payload.data);
            break;
        }
      }
    );
  }

  get sheet(): Sheet {
    return this._sheet;
  }

  get tabOrder(): string[] {
    return this._sheet.tabOrder;
  }

  get selectedTabName(): string {
    return this._sheet.selectedTabName;
  }

  get selectedTab(): Tab {
    return this._sheet.tabs[this.selectedTabName];
  }

  isLoadedSheet(): boolean {
    if (!this._sheet) {
      return false;
    }
    return true;
  }

  private setSheet(action: SheetAction.LoadSheet) {
    this._sheet = action.sheet;
    this.emit({ eventType: SheetStoreService.LOAD_SHEET_EVENT });
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "sheet", show: false }
    });
  }

  getTab(tabName: string): Tab {
    return this._sheet.tabs[tabName];
  }

  private selectTab(action: SheetAction.SelectTab) {
    this._sheet.selectedTabName = action.tabName;
    this.emit({ eventType: SheetStoreService.SELECT_TAB_EVENT });
  }

}

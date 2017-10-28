import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/common/base";
import { ChorusDispatcherService } from "app/common/services";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";
import { SheetDispatcherService, SheetActionService, SheetAction, ElementTypeService } from "app/sheet/services";
import { Sheet, Tab } from "app/sheet";
import { ElementBase } from "app/sheet/element";
import { UUID } from "app/common/utils";

@Injectable()
export class SheetStoreService extends Emitter<Payload> {

  static EVENT_PREFIX: string = "SheetStoreService.";
  static LOAD_SHEET_EVENT: string = SheetStoreService.EVENT_PREFIX + "load-sheet";
  static SELECT_TAB_EVENT: string = SheetStoreService.EVENT_PREFIX + "select-tab";
  
  sheetDispatcherId: string;

  private _sheet: Sheet;

  private _selectedElementConstructor: any;

  private _focusElementId: string;

  constructor(
    private chorusDispatcherService: ChorusDispatcherService,
    private sheetDispatcherService: SheetDispatcherService,
    private elementTypeService: ElementTypeService
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
          case SheetActionService.CLICK_SHEET_EVENT:
            this.createElement(<SheetAction.ClickSheet>payload.data);
            break;
          case SheetActionService.CHANGE_SELECTED_ELEMENT_EVENT:
            this.changeSelectedElement(<SheetAction.ChangeSelectedElement>payload.data);
            break;
        }
      }
    );

    this._selectedElementConstructor = this.elementTypeService.getDefaultElementConstructor();
  }

  get sheet(): Sheet {
    return this._sheet;
  }

  get tabs(): { [tabName: string]: Tab; } {
    return this._sheet.tabs;
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

  get focusElementId(): string {
    return this._focusElementId;
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

  private changeSelectedElement(action: SheetAction.ChangeSelectedElement) {
    this._selectedElementConstructor = action.elememntConstructor;
  }

  private createElement(action: SheetAction.ClickSheet) {
    this._focusElementId = UUID.v4();
    var element: ElementBase = new this._selectedElementConstructor();
    element.posX = action.pos.x;
    element.posY = action.pos.y;
    this.selectedTab.elementOrder.push(this._focusElementId);
    this.selectedTab.elements[this._focusElementId] = element;
  }

}

import { Injectable } from '@angular/core';
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";
import { ElementBase } from "app/sheet/element/element-base";
import { EditCommandActionService } from "app/sheet/services/edit-command/edit-command-action.service";
import { EditCommandTypeService } from "app/sheet/services/edit-command/edit-command-type.service";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { SheetAction } from "app/sheet/services/sheet-action";
import { Sheet } from "app/sheet/sheet";
import { Tab } from "app/sheet/tab";
import { Emitter, Payload } from "app/common/base/emitter";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { UUID } from "app/common/utils/uuid";
import { TextArea } from 'app/sheet/element/text-area';

@Injectable()
export class SheetStoreService extends Emitter<Payload> {

  static EVENT_PREFIX: string = "SheetStoreService.";
  static LOAD_SHEET_EVENT: string = SheetStoreService.EVENT_PREFIX + "load-sheet";
  static SELECT_TAB_EVENT: string = SheetStoreService.EVENT_PREFIX + "select-tab";
  static CHANGE_ELEMENT_FOCUS_EVENT: string = SheetStoreService.EVENT_PREFIX + "change-element-focus";
  
  sheetDispatcherId: string;

  private _sheet: Sheet;

  private _focusElementId: string;
  private _focusElement: ElementBase;

  private _activeElementType: string = TextArea.name;

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
          case SheetActionService.CHANGE_ELEMENT_FOCUS_EVENT:
            this.changeFocusElement(<SheetAction.ChangeElementFocus>payload.data);
            break;
        }
      }
    );
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

  get focusElement(): ElementBase {
    return this._focusElement;
  }

  get activeElementType(): string {
    return this._activeElementType;
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

  private changeFocusElement(action: SheetAction.ChangeElementFocus) {
    this._focusElementId = action.elementId;
    this._focusElement = action.element;
    if (action.element) {
      this._activeElementType = action.element.elementName;
    }
    this.emit({ eventType: SheetStoreService.CHANGE_ELEMENT_FOCUS_EVENT });
  }

}

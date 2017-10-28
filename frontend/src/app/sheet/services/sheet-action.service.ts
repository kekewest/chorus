import { Injectable } from '@angular/core';
import { SheetDispatcherService, SheetAction } from "app/sheet/services";
import { Sheet } from "app/sheet";

@Injectable()
export class SheetActionService {

  static EVENT_PREFIX: string = "SheetActionService.";
  static LOAD_SHEET_EVENT: string = SheetActionService.EVENT_PREFIX + "load-sheet";
  static SELECT_TAB_EVENT: string = SheetActionService.EVENT_PREFIX + "select-tab";
  static CLICK_SHEET_EVENT: string = SheetActionService.EVENT_PREFIX + "click-sheet";  
  static UNDO_EVENT: string = SheetActionService.EVENT_PREFIX + "undo";
  static REDO_EVENT: string = SheetActionService.EVENT_PREFIX + "redo";
  static CHANGE_SELECTED_ELEMENT_EVENT: string = SheetActionService.EVENT_PREFIX + "change-selected-element";

  constructor(private sheetDispatcherService: SheetDispatcherService) { }

  undo() {
    this.sheetDispatcherService.emit({
      eventType: SheetActionService.UNDO_EVENT
    });
  }

  redo() {
    this.sheetDispatcherService.emit({
      eventType: SheetActionService.REDO_EVENT
    });
  }

  selectTab(tabName: string) {
    var action: SheetAction.SelectTab = {
      tabName: tabName
    };

    this.sheetDispatcherService.emit({
      eventType: SheetActionService.SELECT_TAB_EVENT,
      data: action
    });
  }

  setSheet(sheet: Sheet) {
    var action: SheetAction.LoadSheet = {
      sheet: sheet
    };
    
    this.sheetDispatcherService.emit({
      eventType: SheetActionService.LOAD_SHEET_EVENT,
      data: action
    });
  }

  clickSheet(pos: {x: number, y: number}, mouseEvent: MouseEvent) {
    var action: SheetAction.ClickSheet = {
      pos: pos,
      mouseEvent: mouseEvent
    };

    this.sheetDispatcherService.emit({
      eventType: SheetActionService.CLICK_SHEET_EVENT,
      data: action
    });
  }

}

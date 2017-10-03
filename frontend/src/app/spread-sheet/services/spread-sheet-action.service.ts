import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetAction } from "app/spread-sheet/services";
import { SelectedCellPosition, SpreadSheet, Sheet, Cell, RGBAColor } from "app/spread-sheet";

@Injectable()
export class SpreadSheetActionService {

  static EVENT_PREFIX: string = "SpreadSheetActionService.";
  static LOAD_SPREADSHEET_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "load-spreadsheet";
  static SELECT_SHEET_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "select-sheet";
  static SELECT_CELL_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "select-cell";
  static UNDO_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "undo";
  static REDO_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "redo";

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  undo() {
    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.UNDO_EVENT
    });
  }

  redo() {
    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.REDO_EVENT
    });
  }

  selectSheet(sheetName: string) {
    var action: SpreadSheetAction.SelectSheet = {
      sheetName: sheetName
    };

    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.SELECT_SHEET_EVENT,
      data: action
    });
  }

  selectCell(sheetName: string, startColNum: number, startRowNum: number, endColNum: number, endRowNum: number, clickColNum: number, clickRowNum: number) {
    var action: SpreadSheetAction.SelectCell = {
      sheetName: sheetName,
      selectedCellPos: new SelectedCellPosition(startColNum, startRowNum, endColNum, endRowNum, clickColNum, clickRowNum)
    };

    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.SELECT_CELL_EVENT,
      data: action
    });
  }

  setSpreadSheet(spreadSheet: SpreadSheet) {
    var action: SpreadSheetAction.LoadSpreadSheet = {
      spreadSheet: spreadSheet
    };
    
    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.LOAD_SPREADSHEET_EVENT,
      data: action
    });
  }

}

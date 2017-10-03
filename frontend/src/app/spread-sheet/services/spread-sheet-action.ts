import { SelectedCellPosition, SpreadSheet } from "app/spread-sheet";

export module SpreadSheetAction {

  export interface SelectSheet {
    sheetName: string;
  }

  export interface SelectCell {
    sheetName: string;
    selectedCellPos: SelectedCellPosition;
  }

  export interface LoadSpreadSheet {
    spreadSheet: SpreadSheet;
  }

}

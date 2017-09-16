
import { SelectedCellPosition } from "app/spread-sheet";

export module SheetViewAction {

  export interface ChangeSheetViewSize {
    width: number;
    height: number;
  }

  export interface ScrollSheet {
    scrollTop: number;
    scrollLeft: number;
  }

}

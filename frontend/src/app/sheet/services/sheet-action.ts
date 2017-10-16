import { Sheet } from "app/sheet";

export module SheetAction {

  export interface SelectTab {
    tabName: string;
  }

  export interface LoadSheet {
    sheet: Sheet;
  }

  export interface ClickSheet {
    pos: {x: number, y: number};
    mouseEvent: MouseEvent;
  }

}

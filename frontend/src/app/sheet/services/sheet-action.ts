import { Sheet } from "app/sheet/sheet";
import { ElementBase } from "app/sheet/element/element-base";

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

  export interface ChangeInitCommand {
    initCommandConstructor: any;
  }

  export interface ChangeElementFocus {
    elementId: string;
    element: ElementBase;
  }

}

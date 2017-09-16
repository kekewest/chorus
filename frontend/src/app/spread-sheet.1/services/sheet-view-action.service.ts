import { Injectable } from '@angular/core';
import { SheetViewDispatcherService, SheetViewAction } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

@Injectable()
export class SheetViewActionService {

  static EVENT_PREFIX: string = "SheetViewActionService.";
  static CHANGE_SIZE_EVENT: string = SheetViewActionService.EVENT_PREFIX + "change-size";
  static SCROLL_EVENT: string      = SheetViewActionService.EVENT_PREFIX + "scroll";

  constructor(
    private sheetViewDispatcherService: SheetViewDispatcherService,
  ) { }

  changeSheetViewSize(width: number, height: number) {
    var action: SheetViewAction.ChangeSheetViewSize = {
      width: width,
      height: height
    };

    this.sheetViewDispatcherService.emit({
      eventType: SheetViewActionService.CHANGE_SIZE_EVENT,
      data: action
    });
  }

  scrollSheetView(scrollTop: number, scrollLeft: number) {
    var action: SheetViewAction.ScrollSheet = {
      scrollTop: scrollTop,
      scrollLeft: scrollLeft
    };

    this.sheetViewDispatcherService.emit({
      eventType: SheetViewActionService.SCROLL_EVENT,
      data: action
    });
  }

}

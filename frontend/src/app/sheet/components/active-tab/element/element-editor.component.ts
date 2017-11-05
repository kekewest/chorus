import { HostBinding, HostListener } from "@angular/core";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { EditCommandActionService } from "app/sheet/services/edit-command/edit-command-action.service";

export abstract class ElementEditorComponent {

  @HostBinding("hidden")
  hidden: boolean = true;

  @HostBinding("style.position")
  position: string = "absolute";

  @HostBinding("style.left.px")
  posX: number;

  @HostBinding("style.top.px")
  posY: number;

  sheetDispatcherService: SheetDispatcherService;

  sheetStoreService: SheetStoreService;

  sheetActionService: SheetActionService;

  editCommandActionService: EditCommandActionService;

  @HostListener("click", ["$event"])
  onClick(event: Event) {
    event.stopPropagation();
  }

}

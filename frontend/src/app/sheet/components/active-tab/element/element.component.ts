import { ElementBase } from "app/sheet/element";
import { OnInit, Input, HostBinding, HostListener } from "@angular/core";
import { SheetStoreService, SheetActionService, SheetDispatcherService } from "app/sheet/services";
import { EditCommandActionService } from "app/sheet/services/edit-command";

export abstract class ElementComponent implements OnInit {

  @Input()
  elementId: string;

  @Input()
  element: ElementBase;

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

  ngOnInit(): void {
    this.posX = this.element.posX;
    this.posY = this.element.posY;
  }

  @HostListener("click", ["$event"])
  onClick(event: Event) {
    event.stopPropagation();
  }

}

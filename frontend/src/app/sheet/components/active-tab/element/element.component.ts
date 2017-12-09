import { OnInit, Input, HostBinding, HostListener } from "@angular/core";
import { ElementBase } from "app/sheet/element/element-base";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { EditCommandActionService } from "app/sheet/services/edit-command/edit-command-action.service";

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

  ngOnInit(): void {
    this.posX = this.element.posX;
    this.posY = this.element.posY;
  }

  @HostListener("click", ["$event"])
  onClick(event: Event) {
    event.stopPropagation();
  }

}

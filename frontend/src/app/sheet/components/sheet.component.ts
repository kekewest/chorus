import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { EditCommandStoreService } from "app/sheet/services/edit-command/edit-command-store.service";
import { EditCommandTypeService } from "app/sheet/services/edit-command/edit-command-type.service";
import { EditCommandActionService } from "app/sheet/services/edit-command/edit-command-action.service";
import { ConcurrentEditService } from "app/sheet/services/concurrent-edit.service";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { ElementTypeService } from "app/sheet/services/element-type.service";

@Component({
  selector: 'cr-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  providers: [
    ConcurrentEditService,
    SheetDispatcherService,
    SheetStoreService,
    SheetActionService,
    EditCommandStoreService,
    ElementTypeService,
    EditCommandTypeService,
    EditCommandActionService
  ]
})
export class SheetComponent implements OnInit, OnDestroy {

  constructor(
    private concurrentEditService: ConcurrentEditService,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService,
    private editCommandStoreService: EditCommandStoreService,
    private elementTypeService: ElementTypeService,
    private editCommandTypeService: EditCommandTypeService,
    private editCommandActionService: EditCommandActionService
  ) { }

  ngOnInit() {
    this.concurrentEditService.start();
  }

  ngOnDestroy() {
    this.concurrentEditService.close();
  }

}

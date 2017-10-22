import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";
import { SheetDispatcherService, SheetStoreService, SheetActionService, ConcurrentEditService, ElementTypeService } from "app/sheet/services";
import { EditCommandActionService, EditCommandTypeService, EditCommandStoreService } from "app/sheet/services/edit-command";

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

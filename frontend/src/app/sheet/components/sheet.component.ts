import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";
import { SheetDispatcherService, SheetStoreService, SheetActionService, ConcurrentEditService, EditCommandStoreService, ElementTypeService } from "app/sheet/services";

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
    ElementTypeService
  ]
})
export class SheetComponent implements OnInit, OnDestroy {

  constructor(
    private concurrentEditService: ConcurrentEditService,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService,
    private editCommandStoreService: EditCommandStoreService,
    private elementTypeService: ElementTypeService
  ) { }

  ngOnInit() {
    this.concurrentEditService.start();
  }

  ngOnDestroy() {
    this.concurrentEditService.close();
  }

}

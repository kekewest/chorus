import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";
import { SheetDispatcherService, SheetStoreService, SheetActionService, ConcurrentEditService, EditCommandStoreService } from "app/sheet/services";

@Component({
  selector: 'cr-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  providers: [
    ConcurrentEditService,
    SheetDispatcherService,
    SheetStoreService,
    SheetActionService,
    EditCommandStoreService
  ]
})
export class SheetComponent implements OnInit, OnDestroy {

  constructor(
    private concurrentEditService: ConcurrentEditService,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService,
    private editCommandStoreService: EditCommandStoreService
  ) { }

  ngOnInit() {
    this.concurrentEditService.start();
  }

  ngOnDestroy() {
    this.concurrentEditService.close();
  }

}

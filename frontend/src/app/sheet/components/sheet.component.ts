import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";
import { SheetDispatcherService, SheetStoreService, SheetActionService, ConcurrentEditApiService, EditCommandStoreService } from "app/sheet/services";

@Component({
  selector: 'cr-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  providers: [
    ConcurrentEditApiService,
    SheetDispatcherService,
    SheetStoreService,
    SheetActionService,
    EditCommandStoreService
  ]
})
export class SheetComponent implements OnInit, OnDestroy {

  constructor(
    private concurrentEditApiService: ConcurrentEditApiService,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService,
    private editCommandStoreService: EditCommandStoreService
  ) { }

  ngOnInit() {
    this.concurrentEditApiService.start();
  }

  ngOnDestroy() {
    this.concurrentEditApiService.close();
  }

}

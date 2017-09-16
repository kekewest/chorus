import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";
import { SheetDispatcherService, SheetStoreService, SheetActionService, SharedEditApiService, EditCommandStoreService } from "app/sheet/services";

@Component({
  selector: 'cr-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  providers: [
    SharedEditApiService,
    SheetDispatcherService,
    SheetStoreService,
    SheetActionService,
    EditCommandStoreService
  ]
})
export class SheetComponent implements OnInit, OnDestroy {

  constructor(
    private sharedEditApiService: SharedEditApiService,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService,
    private editCommandStoreService: EditCommandStoreService
  ) { }

  ngOnInit() {
    this.sharedEditApiService.start();
  }

  ngOnDestroy() {
    this.sharedEditApiService.close();
  }

}

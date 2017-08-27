import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetActionService, SpreadSheetStoreService, EditCommandStoreService, SheetViewDispatcherService, SheetViewActionService, SheetViewStoreService, SharedEditApiService } from "app/spread-sheet/services";
import { Sheet } from "app/spread-sheet";
import { Payload } from "app/common/base";

@Component({
  selector: 'wf-spread-sheet',
  templateUrl: './spread-sheet.component.html',
  styleUrls: ['./spread-sheet.component.scss'],
  providers: [
    SharedEditApiService,
    SpreadSheetDispatcherService,
    SpreadSheetActionService,
    SpreadSheetStoreService,
    SheetViewDispatcherService,
    SheetViewActionService,
    SheetViewStoreService,
    EditCommandStoreService
  ]
})
export class SpreadSheetComponent implements OnInit, OnDestroy {

  constructor(
    private sharedEditApiService: SharedEditApiService,
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private sheetViewActionService: SheetViewActionService,
    private sheetViewDispatcherService: SheetViewDispatcherService,
    private sheetViewStoreService: SheetViewStoreService,
    private editCommandStoreService: EditCommandStoreService
  ) { }

  ngOnInit() {
    this.sharedEditApiService.start();
  }

  ngOnDestroy() {
    this.sharedEditApiService.close();
  }

}

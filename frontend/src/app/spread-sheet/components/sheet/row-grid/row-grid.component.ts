import { Component, OnInit, Input } from '@angular/core';
import { SheetViewStoreService, SheetViewActionService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";

@Component({
  selector: 'wf-row-grid',
  templateUrl: './row-grid.component.html',
  styleUrls: ['./row-grid.component.scss']
})
export class RowGridComponent implements OnInit {

  sheetViewRowList: number[];

  rowViewTop: number;

  constructor(
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetViewStoreService.UPDATE_EVENT:
            this.updateRowView();
            break;
        }
      }
    );
  }

  private updateRowView() {
    this.sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    this.rowViewTop = (this.sheetViewStoreService.viewScrollTop - this.sheetViewStoreService.sheetViewTop) * -1;
  }

}

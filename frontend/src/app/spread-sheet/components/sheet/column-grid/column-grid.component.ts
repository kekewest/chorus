import { Component, OnInit, Input } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";

@Component({
  selector: 'wf-column-grid',
  templateUrl: './column-grid.component.html',
  styleUrls: ['./column-grid.component.scss']
})
export class ColumnGridComponent implements OnInit {

  sheetViewColumnList: number[];

  columnViewLeft: number;

  constructor(
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetViewStoreService.UPDATE_EVENT:
            this.updateColumnView();
            break;
        }
      }
    );
  }

  private updateColumnView() {
    this.sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    this.columnViewLeft = (this.sheetViewStoreService.viewScrollLeft - this.sheetViewStoreService.sheetViewLeft) * -1;
  }

}

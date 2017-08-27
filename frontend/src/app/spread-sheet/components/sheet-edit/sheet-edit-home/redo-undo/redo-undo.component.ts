import { Component, OnInit } from '@angular/core';
import { SpreadSheetActionService } from "app/spread-sheet/services";

@Component({
  selector: 'wf-redo-undo',
  templateUrl: './redo-undo.component.html',
  styleUrls: ['./redo-undo.component.scss']
})
export class RedoUndoComponent implements OnInit {

  constructor(
    private spreadSheetActionService: SpreadSheetActionService
  ) { }

  ngOnInit() {
  }

  undo() {
    this.spreadSheetActionService.undo();
  }

  redo() {
    this.spreadSheetActionService.redo();
  }

}

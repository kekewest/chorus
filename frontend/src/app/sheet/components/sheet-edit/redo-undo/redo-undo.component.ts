import { Component, OnInit } from '@angular/core';
import { SheetActionService } from "app/sheet/services";

@Component({
  selector: 'cr-redo-undo',
  templateUrl: './redo-undo.component.html',
  styleUrls: ['./redo-undo.component.scss']
})
export class RedoUndoComponent implements OnInit {

  constructor(
    private sheetActionService: SheetActionService
  ) { }

  ngOnInit() {
  }

  undo() {
    this.sheetActionService.undo();
  }

  redo() {
    this.sheetActionService.redo();
  }

}

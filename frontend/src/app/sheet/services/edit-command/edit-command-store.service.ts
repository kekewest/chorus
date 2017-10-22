import { Injectable } from '@angular/core';
import { Payload } from "app/common/base";
import { _ } from "app";
import { EditCommandActionService } from "app/sheet/services/edit-command";
import { SheetDispatcherService, SheetStoreService, SheetActionService } from "app/sheet/services";
import { EditCommand } from "app/sheet/services/edit-command/command";

@Injectable()
export class EditCommandStoreService {

  private _undoCommandStack: EditCommand[] = [];

  private _redoCommandStack: EditCommand[] = [];

  constructor(
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService
  ) {
    this.sheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case EditCommandActionService.EDIT_EVENT:
            this.invokeEditCommand(<EditCommand>payload.data);
            break;
          case SheetActionService.UNDO_EVENT:
            this.undo();
            break;
          case SheetActionService.REDO_EVENT:
            this.redo();
            break;
        }
      }
    );
  }

  private invokeEditCommand(command: EditCommand) {
    command.sheetStoreService = this.sheetStoreService;
    command.sheetActionService = this.sheetActionService;
    command.invoke();
    
    this._redoCommandStack = [];
    this._undoCommandStack.push(command);
  }

  private undo() {
    if (_.isEmpty(this._undoCommandStack)) {
      return;
    }
    var command: EditCommand = this._undoCommandStack.pop();
    command.undo();
    this._redoCommandStack.push(command);
  }

  private redo() {
    if (_.isEmpty(this._redoCommandStack)) {
      return;
    }
    var command: EditCommand = this._redoCommandStack.pop();
    command.redo();
    this._undoCommandStack.push(command);
  }

}

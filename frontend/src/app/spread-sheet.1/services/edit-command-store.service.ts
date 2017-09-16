import { Injectable } from '@angular/core';
import { SpreadSheetStoreService, SpreadSheetDispatcherService, SpreadSheetActionService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";
import { EditCommand, EditCommandActionService } from "app/spread-sheet/services/command-actions";
import { _ } from "app";

@Injectable()
export class EditCommandStoreService {

  private _undoCommandStack: EditCommand[] = [];

  private _redoCommandStack: EditCommand[] = [];

  constructor(
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private spreadSheetActionService: SpreadSheetActionService
  ) {
    this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case EditCommandActionService.EDIT_EVENT:
            this.invokeEditCommand(<EditCommand>payload.data);
            break;
          case SpreadSheetActionService.UNDO_EVENT:
            this.undo();
            break;
          case SpreadSheetActionService.REDO_EVENT:
            this.redo();
            break;
        }
      }
    );
  }

  private invokeEditCommand(command: EditCommand) {
    command.spreadSheet = this.spreadSheetStoreService.spreadSheet;
    command.spreadSheetActionService = this.spreadSheetActionService;
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

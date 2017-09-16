import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, EditCommandStoreService, SharedEditApiService } from "app/spread-sheet/services";
import { EditCommand, EditCommandActionService } from "app/spread-sheet/services/command-actions";
import { _ } from "app";
import { Sheet } from "app/spread-sheet";

@Injectable()
export class CreateNewSheetActionService extends EditCommandActionService {

  constructor(
    protected spreadSheetDispatcherService: SpreadSheetDispatcherService,
    protected sharedEditApiService: SharedEditApiService
  ) {
    super(spreadSheetDispatcherService, sharedEditApiService);
  }

  get commandName(): string {
    return "CreateNewSheetCommand";
  }

  deserializeEditCommand(editCommandJsonStr: string): EditCommand {
    return new CreateNewSheetCommand().fromJSON(JSON.parse(editCommandJsonStr));
  }

  createNewSheet() {
    this.sendEditCommand(new CreateNewSheetCommand());
  }

}

class CreateNewSheetCommand extends EditCommand {

  private static SHEET_NAME_PREFIX: string = "Sheet";

  private sheetName: string;
  private newSheetIndex: number;

  invoke() {
    this.sheetName = this.generateNewSheetName();
    this.newSheetIndex = this._spreadSheet.sheetOrder.indexOf(this._spreadSheet.selectedSheetName) + 1;
    this._spreadSheet.sheetOrder.splice(this.newSheetIndex, 0, this.sheetName);
    this._spreadSheet.selectedSheetName = this.sheetName;
    this._spreadSheet.sheets[this.sheetName] = new Sheet(this.sheetName);
    this._spreadSheetActionService.selectSheet(this._spreadSheet.selectedSheetName);
  }

  undo() {
    if (this._spreadSheet.selectedSheetName === this.sheetName) {
      var selectSheetIndex: number = this._spreadSheet.sheetOrder.indexOf(this.sheetName);
      if (selectSheetIndex + 1 === this._spreadSheet.sheetOrder.length) {
        this._spreadSheet.selectedSheetName = this._spreadSheet.sheetOrder[selectSheetIndex - 1];
      } else {
        this._spreadSheet.selectedSheetName = this._spreadSheet.sheetOrder[selectSheetIndex + 1];
      }
      this._spreadSheetActionService.selectSheet(this._spreadSheet.selectedSheetName);
    }
    
    _.remove(this._spreadSheet.sheetOrder, (v: string) => v === this.sheetName);
    delete this._spreadSheet.sheets[this.sheetName];
  }

  redo() {
    this._spreadSheet.sheetOrder.splice(this.newSheetIndex, 0, this.sheetName);
    this._spreadSheet.sheets[this.sheetName] = new Sheet(this.sheetName);
  }

  private generateNewSheetName(): string {
    var nextSheetCount: number = this._spreadSheet.sheetOrder.length + 1;
    var sheetName: string = CreateNewSheetCommand.SHEET_NAME_PREFIX + nextSheetCount;
    while(0 <= this._spreadSheet.sheetOrder.indexOf(sheetName)) {
      nextSheetCount++;
      sheetName = CreateNewSheetCommand.SHEET_NAME_PREFIX + nextSheetCount;
    }
    return sheetName;
  }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): CreateNewSheetCommand {
    if (!json) {
      return null;
    }

    var command: CreateNewSheetCommand = new CreateNewSheetCommand();
    command.sheetName = json.sheetName;
    command.newSheetIndex = json.newSheetIndex;

    return command;
  }

}
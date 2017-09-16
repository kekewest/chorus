import { Serializable } from "app/common/utils";
import { Payload } from "app/common/base";
import { SheetActionService, SheetDispatcherService, SharedEditApiService } from "app/sheet/services";
import { Sheet } from "app/sheet";

export abstract class EditCommandActionService {

  static EVENT_PREFIX: string = "EditCommandActionService.";
  static EDIT_EVENT: string = EditCommandActionService.EVENT_PREFIX + "edit";

  constructor(
    protected sheetDispatcherService: SheetDispatcherService,
    protected sharedEditApiService: SharedEditApiService
  ) {
    this.sheetDispatcherService.register(
      (payload: Payload) => {
        if (payload.eventType === SharedEditApiService.EDIT_COMMAND_EVENT_PREFIX + this.commandName) {
          this.emitEditCommand(<string>payload.data);
        }
      }
    );
  }

  abstract get commandName(): string;

  abstract deserializeEditCommand(editCommandJsonStr: string): EditCommand;

  protected sendEditCommand(editCommand: EditCommand) {
    var commandJsonStr: string = JSON.stringify(editCommand);
    this.sharedEditApiService.sendEditCommand(this.commandName, commandJsonStr);
  }

  private emitEditCommand(editCommandJsonStr: string) {
    var editCommand: EditCommand = this.deserializeEditCommand(editCommandJsonStr);
    this.sheetDispatcherService.emit({ eventType: EditCommandActionService.EDIT_EVENT, data: editCommand });
  }

}

export abstract class EditCommand implements Serializable {

  protected _sheetActionService: SheetActionService;
  protected _sheet: Sheet;

  set sheet(sheet: Sheet) {
    this._sheet = sheet;
  }

  set sheetActionService(sheetActionService: SheetActionService) {
    this._sheetActionService = sheetActionService;
  }

  abstract invoke();

  abstract undo();

  abstract redo();

  abstract toJSON(): any;

  abstract fromJSON(json: any): Serializable;

}

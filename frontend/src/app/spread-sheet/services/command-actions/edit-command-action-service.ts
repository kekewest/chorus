import { SpreadSheetDispatcherService, SharedEditApiService, SpreadSheetActionService } from "app/spread-sheet/services";
import { SpreadSheet } from "app/spread-sheet";
import { Serializable } from "app/common/utils";
import { Payload } from "app/common/base";

export abstract class EditCommandActionService {

  static EVENT_PREFIX: string = "EditCommandActionService.";
  static EDIT_EVENT: string = EditCommandActionService.EVENT_PREFIX + "edit";

  constructor(
    protected spreadSheetDispatcherService: SpreadSheetDispatcherService,
    protected sharedEditApiService: SharedEditApiService
  ) {
    this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        if (payload.eventType === SharedEditApiService.EDIT_COMMAND_EVENT_PREFIX + this.commandName) {
          this.emitEditCommand(payload.data);
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
    this.spreadSheetDispatcherService.emit({ eventType: EditCommandActionService.EDIT_EVENT, data: editCommand });
  }

}

export abstract class EditCommand implements Serializable {

  protected _spreadSheetActionService: SpreadSheetActionService;
  protected _spreadSheet: SpreadSheet;

  set spreadSheet(spreadSheet: SpreadSheet) {
    this._spreadSheet = spreadSheet;
  }

  set spreadSheetActionService(spreadSheetActionService: SpreadSheetActionService) {
    this._spreadSheetActionService = spreadSheetActionService;
  }

  abstract invoke();

  abstract undo();

  abstract redo();

  abstract toJSON(): any;

  abstract fromJSON(json: any): any;

}

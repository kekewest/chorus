import { Injectable } from "@angular/core";
import { Serializable } from "app/common/utils";
import { Payload } from "app/common/base";
import { SheetActionService, SheetDispatcherService, ConcurrentEditService, SheetStoreService } from "app/sheet/services";
import { EditCommandTypeService } from "app/sheet/services/edit-command";
import { EditCommand } from "app/sheet/services/edit-command/command";

@Injectable()
export class EditCommandActionService {

  static EVENT_PREFIX: string = "EditCommandActionService.";
  static EDIT_EVENT: string = EditCommandActionService.EVENT_PREFIX + "edit";

  constructor(
    private sheetDispatcherService: SheetDispatcherService,
    private concurrentEditService: ConcurrentEditService,
    private editCommandTypeService: EditCommandTypeService
  ) {
    this.sheetDispatcherService.register(
      (payload: Payload) => {
        if (payload.eventType === ConcurrentEditService.EDIT_COMMAND_EVENT) {
          this.emitEditCommand(<string>payload.data);
        }
      }
    );
  }

  invokeEditCommand(editCommand: EditCommand) {
    var commandJsonStr: string = JSON.stringify(editCommand);
    this.concurrentEditService.sendEditCommand(commandJsonStr);
  }

  private emitEditCommand(editCommandJsonStr: string) {
    var editCommand: EditCommand = this.deserializeEditCommand(editCommandJsonStr);
    this.sheetDispatcherService.emit({ eventType: EditCommandActionService.EDIT_EVENT, data: editCommand });
  }

  private deserializeEditCommand(editCommandJsonStr: string): EditCommand {
    var editCommandJson: any = JSON.parse(editCommandJsonStr);
    var constructor: any = this.editCommandTypeService.getEditCommandConstructor(editCommandJson.commandName);
    return (<EditCommand> new constructor()).fromJSON(editCommandJson);
  }

}

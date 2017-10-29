import { Injectable } from "@angular/core";
import { EditCommandTypeService } from "app/sheet/services/edit-command/edit-command-type.service";
import { EditCommand } from "app/sheet/services/edit-command/command/edit-command";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { ConcurrentEditService } from "app/sheet/services/concurrent-edit.service";
import { Payload } from "app/common/base/emitter";

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

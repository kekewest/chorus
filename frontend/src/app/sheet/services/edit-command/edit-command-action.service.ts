import { Injectable } from "@angular/core";
import { EditCommandTypeService } from "app/sheet/services/edit-command/edit-command-type.service";
import { EditCommand } from "app/sheet/services/edit-command/command/edit-command";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { ConcurrentEditService } from "app/sheet/services/concurrent-edit.service";
import { Payload } from "app/common/base/emitter";
import { SheetAction } from "app/sheet/services/sheet-action";
import { InitCommand } from "app/sheet/services/edit-command/command/init-command";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";

@Injectable()
export class EditCommandActionService {

  static EVENT_PREFIX: string = "EditCommandActionService.";
  static EDIT_EVENT: string = EditCommandActionService.EVENT_PREFIX + "edit";

  constructor(
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private concurrentEditService: ConcurrentEditService,
    private editCommandTypeService: EditCommandTypeService
  ) {
    this.sheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case ConcurrentEditService.EDIT_COMMAND_EVENT:
            this.emitEditCommand(<string>payload.data);
            break;
          case SheetActionService.CLICK_SHEET_EVENT:
            this.createElement(<SheetAction.ClickSheet>payload.data);
            break;
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

  private createElement(action: SheetAction.ClickSheet) {
    this.sheetDispatcherService.waitFor([this.sheetStoreService.sheetDispatcherId]);
    var initCommand: InitCommand = new this.sheetStoreService.initCommandConstructor(this.sheetStoreService.focusElementId, action.pos.x, action.pos.y);
    this.invokeEditCommand(initCommand);
  }

}

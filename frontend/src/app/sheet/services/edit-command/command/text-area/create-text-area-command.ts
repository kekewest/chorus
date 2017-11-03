import { _ } from "app";
import { TextArea } from "app/sheet/element/text-area";
import { InitCommand } from "app/sheet/services/edit-command/command/init-command";

export class CreateTextAreaCommand extends InitCommand {

  commandName: string = "CreateTextAreaCommand";

  selectedTabName: string;

  invoke() {
    this.selectedTabName = this._sheetStoreService.selectedTabName;
    var text: TextArea = new TextArea();
    text.posX = this.posX;
    text.posY = this.posY;
    this._sheetStoreService.selectedTab.elementOrder.push(this.elementId);
    this._sheetStoreService.selectedTab.elements[this.elementId] = text;
  }

  undo() {
    this._sheetStoreService.tabs[this.selectedTabName].elementOrder.pop();
    delete this._sheetStoreService.tabs[this.selectedTabName].elements[this.elementId];
  }

  redo() {
    var text: TextArea = new TextArea();
    text.posX = this.posX;
    text.posY = this.posY;
    this._sheetStoreService.tabs[this.selectedTabName].elementOrder.push(this.elementId);
    this._sheetStoreService.tabs[this.selectedTabName].elements[this.elementId] = text;
  }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): CreateTextAreaCommand {
    if (!json) {
      return null;
    }

    super.fromJSON(json);
    return this;
  }

}
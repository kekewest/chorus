import { EditCommand } from "app/sheet/services/edit-command/command/edit-command";
import { TextArea } from "app/sheet/element/text-area";

export class ChangeTextCommand extends EditCommand {

  commandName: string = "ChangeTextCommand";

  private previousText: string;

  constructor(
    private tabName: string,
    private elementId: string,
    private text: string
  ) {
    super();
  }

  invoke() {
    var target: TextArea = <TextArea>this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
    this.previousText = target.text;
    target.text = this.text;
  }

  undo() {
    var target: TextArea = <TextArea>this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
    target.text = this.previousText;
  }

  redo() {
    var target: TextArea = <TextArea>this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
    target.text = this.text;
  }

  toJSON() {
    return this;
  }

  fromJSON(json: any): EditCommand {
    if (!json) {
      return null;
    }

    this.tabName = json.tabName;
    this.elementId = json.elementId;
    this.text = json.text;
    this.previousText = json.previousText;

    return this;
  }

}
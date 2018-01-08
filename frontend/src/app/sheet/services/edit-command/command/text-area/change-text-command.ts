import { EditCommand } from "app/sheet/services/edit-command/command/edit-command";
import { TextArea } from "app/sheet/element/text-area";
import * as _ from "lodash";
import { ElementBase } from "app/sheet/element/element-base";

export class ChangeTextCommand extends EditCommand {

  commandName: string = "ChangeTextCommand";

  private previousText: string;

  private previousPosX: number;

  private previousPosY: number;

  private previousTextArea: TextArea;

  private previousOrder: number;

  private isNew: boolean;

  private isRemoved: boolean;

  constructor(
    private tabName: string,
    private elementId: string,
    private text: string,
    private posX: number,
    private posY: number
  ) {
    super();
  }

  invoke() {
    var target: TextArea = <TextArea>this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
    if (!target) {
      this.invokeTextCreating();
    } else {
      this.invokeTextEditing(target);
    }
  }

  undo() {
    if (this.isNew) {
      delete this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
      this._sheetStoreService.tabs[this.tabName].elementOrder.pop();
      return;
    } else if (this.isRemoved) {
      this._sheetStoreService.tabs[this.tabName].elements[this.elementId] = this.previousTextArea;
      this._sheetStoreService.tabs[this.tabName].elementOrder.splice(this.previousOrder, 0, this.elementId);
      return;
    }

    var target: TextArea = <TextArea>this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
    target.text = this.previousText;
    target.posX = this.previousPosX;
    target.posY = this.previousPosY;
    target.clearSafeHtmlCache();
  }

  redo() {
    if (this.isNew) {
      this.invokeTextCreating();
      return;
    } else if (this.isRemoved) {
      delete this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
      _.pull(this._sheetStoreService.tabs[this.tabName].elementOrder, this.elementId);
      return;
    }

    var target: TextArea = <TextArea>this._sheetStoreService.tabs[this.tabName].elements[this.elementId];
    target.text = this.text;
    target.posX = this.posX;
    target.posY = this.posY;
    target.clearSafeHtmlCache();
  }

  private invokeTextCreating() {
    var newTextArea: TextArea = new TextArea(this.posX, this.posY, this.text, null);

    this._sheetStoreService.tabs[this.tabName].elements[this.elementId] = newTextArea;
    this._sheetStoreService.tabs[this.tabName].elementOrder.push(this.elementId);

    this.isNew = true;
  }

  private invokeTextEditing(target: TextArea) {
    if (_.isEmpty(this.text)) {
      var elements: { [id: string]: ElementBase } = this._sheetStoreService.tabs[this.tabName].elements;
      this.previousTextArea = <TextArea>elements[this.elementId];
      delete elements[this.elementId];

      var elementOrder: string[] = this._sheetStoreService.tabs[this.tabName].elementOrder;
      this.previousOrder = _.findIndex(elementOrder, (id: string) => { return id === this.elementId; });
      _.pull(elementOrder, this.elementId);

      this.isRemoved = true;
      return;
    }

    this.previousText = target.text;
    this.previousPosX = target.posX;
    this.previousPosY = target.posY;
    target.text = this.text;
    target.posX = this.posX;
    target.posY = this.posY;
    target.clearSafeHtmlCache();
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
    this.posX = json.posX;
    this.posY = json.posY;

    return this;
  }

}
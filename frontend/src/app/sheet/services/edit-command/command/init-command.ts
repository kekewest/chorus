import { EditCommand } from "app/sheet/services/edit-command/command/edit-command";
import { UUID } from "app/common/utils/uuid";

export abstract class InitCommand extends EditCommand {

  constructor(
    private _elementId?: string,
    public posX?: number,
    public posY?: number
  ) {
    super();
  }

  get elementId(): string {
    return this._elementId;
  }

  fromJSON(json: any): EditCommand {
    if (!json) {
      return null;
    }

    this._elementId = json._elementId;
    this.posX = json.posX;
    this.posY = json.posY;
    
    return this;
  }

}

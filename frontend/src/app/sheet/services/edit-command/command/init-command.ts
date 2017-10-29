import { EditCommand } from "app/sheet/services/edit-command/command/edit-command";
import { UUID } from "app/common/utils/uuid";

export abstract class InitCommand extends EditCommand {

  constructor(
    private _elementId?: string,
    private _posX?: number,
    private _posY?: number
  ) {
    super();
  }

  get elementId(): string {
    return this._elementId;
  }

  get posX(): number {
    return this._posX;
  }

  get posY(): number {
    return this._posY;
  }

  fromJSON(json: any): EditCommand {
    if (!json) {
      return null;
    }

    this._elementId = json._elementId;
    this._posX = json._posX;
    this._posY = json._posY;
    
    return this;
  }

}

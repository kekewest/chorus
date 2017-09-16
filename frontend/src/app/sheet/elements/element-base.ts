
import { Serializable } from "app/common/utils";

export class ElementBase implements Serializable {

  constructor(
    public type?: string,
    public posX?: number,
    public posY?: number
  ) {
    this.type = this.constructor.name;
  }

  toJSON(): ElementBase {
    return this;
  }

  fromJSON(json: any): ElementBase {
    if (!json) {
      return null;
    }

    this.posX = json.posX;
    this.posY = json.posY;
    
    return this;
  }

}

import { Serializable } from "app/common/utils/serializable";

export abstract class ElementBase implements Serializable {

  abstract elementName: string;

  constructor(
    public posX?: number,
    public posY?: number
  ) { }

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

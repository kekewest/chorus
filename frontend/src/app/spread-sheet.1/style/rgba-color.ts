import { Serializable } from "app/common/utils";

export class RGBAColor implements Serializable {

  constructor(
    public colorR: number = 255,
    public colorG: number = 255,
    public colorB: number = 255,
    public alpha: number = 0
  ) { }

  toString() {
    return "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.alpha + ")";
  }

  toJSON(): any {
    return this;
  }
  fromJSON(json: any): RGBAColor {
    if (!json) {
      return null;
    }
    
    return new RGBAColor(json.colorR, json.colorG, json.colorB, json.alpha);
  }

}

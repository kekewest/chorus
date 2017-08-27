
import { RGBAColor } from "app/spread-sheet";
import { Serializable } from "app/common/utils";

export class Font implements Serializable {

  fontFamily: string = "sans-serif";

  fontSize: number = 9;

  fontColor: RGBAColor = new RGBAColor(0, 0, 0, 1);

  bold: boolean = false;

  toString(): string {
    return (this.bold ? "bold " : "") + this.fontSize + "pt " + this.fontFamily;
  }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): Font {
    if (!json) {
      return null;
    }
    
    var font: Font = new Font();
    font.fontFamily = json.fontFamily;
    font.fontSize = json.fontSize;
    font.fontColor = new RGBAColor().fromJSON(json.fontColor);
    font.bold = json.bold;
    return font;
  }

}

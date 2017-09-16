
import { RGBAColor } from "app/spread-sheet";
import { Serializable } from "app/common/utils";

export class Border implements Serializable {

  borderBottom: boolean = false;
  borderBottomColor: RGBAColor;
  borderBottomStyle: string;
  borderBottomWidth: number;

  borderRight: boolean = false;
  borderRightColor: RGBAColor;
  borderRightStyle: string;
  borderRightWidth: number;

  toJSON(): any {
    return this;
  }
  fromJSON(json: any): Border {
    if (!json) {
      return null;
    }
    
    var border: Border = new Border();

    border.borderBottom = json.borderBottom;
    border.borderBottomColor = new RGBAColor().fromJSON(json.borderBottomColor);
    border.borderBottomStyle = json.borderBottomStyle;
    border.borderBottomWidth = json.borderBottomWidth;

    border.borderRight = json.borderRight;
    border.borderRightColor = new RGBAColor().fromJSON(json.borderRightColor);
    border.borderRightStyle = json.borderRightStyle;
    border.borderRightWidth = json.borderRightWidth;

    return border;
  }

}

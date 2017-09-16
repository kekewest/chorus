import { CommonGridStyle } from "app/spread-sheet/common-grid-style";
import { Serializable } from "app/common/utils";
import { RGBAColor, Border, Font } from "app/spread-sheet";

export class Row extends CommonGridStyle implements Serializable {

  height: number = 20;

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): Row {
    if (!json) {
      return null;
    }
    
    var row: Row = new Row();

    row.backgroundColor = new RGBAColor().fromJSON(json.backgroundColor);
    row.border = new Border().fromJSON(json.border);
    row.font = new Font().fromJSON(json.font);
    row.height = json.height;

    return row;
  }

}

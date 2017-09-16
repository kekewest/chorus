
import { CommonGridStyle } from "app/spread-sheet/common-grid-style";
import { Serializable } from "app/common/utils";
import { RGBAColor, Border, Font } from "app/spread-sheet";

export class Column extends CommonGridStyle implements Serializable {

  width: number = 90;

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): Column {
    if (!json) {
      return null;
    }
    
    var column: Column = new Column();

    column.backgroundColor = new RGBAColor().fromJSON(json.backgroundColor);
    column.border = new Border().fromJSON(json.border);
    column.font = new Font().fromJSON(json.font);
    column.width = json.width;

    return column;
  }

}

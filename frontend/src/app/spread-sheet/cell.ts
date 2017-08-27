
import { CommonGridStyle } from "app/spread-sheet/common-grid-style";
import { Serializable } from "app/common/utils";
import { RGBAColor, Border, Font } from "app/spread-sheet";

export class Cell extends CommonGridStyle implements Serializable {

  value: string = null;

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): Cell {
    if (!json) {
      return null;
    }
    
    var cell: Cell = new Cell();

    cell.backgroundColor = new RGBAColor().fromJSON(json.backgroundColor);
    cell.border = new Border().fromJSON(json.border);
    cell.font = new Font().fromJSON(json.font);
    cell.value = json.value;

    return cell;
  }

}

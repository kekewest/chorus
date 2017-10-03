
import { Sheet } from "app/spread-sheet";
import { Serializable } from "app/common/utils";
import { _ } from "app";

export class SpreadSheet implements Serializable {

  constructor(
    public name?: string,
    public sheets?: { [sheetName: string]: Sheet },
    public sheetOrder?: string[],
    public selectedSheetName?: string
  ) { }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): SpreadSheet {
    if (!json) {
      return null;
    }
    
    var spreadSheet: SpreadSheet = new SpreadSheet();

    spreadSheet.name = json.name;
    
    spreadSheet.sheets = {};
    _.forOwn(json.sheets, (sheet, sheetName) => {
      spreadSheet.sheets[sheetName] = new Sheet().fromJSON(sheet);
    });

    spreadSheet.sheetOrder = json.sheetOrder;
    spreadSheet.selectedSheetName = json.selectedSheetName;
    
    return spreadSheet;
  }

}

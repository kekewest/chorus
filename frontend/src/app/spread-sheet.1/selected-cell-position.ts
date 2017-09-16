import { Serializable } from "app/common/utils";

export class SelectedCellPosition implements Serializable {

  constructor(
    public startColNum?: number,
    public startRowNum?: number,
    public endColNum?: number,
    public endRowNum?: number,
    public clickColNum?: number,
    public clickRowNum?: number
  ) { }

  contains(colNum: number, rowNum: number): boolean {
    if (colNum < this.startColNum || this.endColNum < colNum) {
      return false;
    }
    if (rowNum < this.startRowNum || this.endRowNum < rowNum) {
      return false;
    }
    return true;
  }

  isClickCell(colNum: number, rowNum: number): boolean {
    if (this.clickColNum === colNum && this.clickRowNum === rowNum) {
      return true;
    }
    return false;
  }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): SelectedCellPosition {
    if (!json) {
      return null;
    }
    
    return new SelectedCellPosition(
      json.startColNum,
      json.startRowNum,
      json.endColNum,
      json.endRowNum,
      json.clickColNum,
      json.clickRowNum
    );
  }

}
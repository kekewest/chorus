
import { Column, Row, Cell, SelectedCellPosition, SheetView } from "app/spread-sheet";
import { Serializable } from "app/common/utils";
import { _ } from "app";

export class Sheet implements Serializable {

  columns: { [colIndex: number]: Column } = {};

  rows: { [rowIndex: number]: Row } = {};

  cells: { [colIndex: number]: { [rowIndex: number]: Cell } } = {};

  defaultColumn: Column = new Column();

  defaultRow: Row = new Row();

  defaultCell: Cell = new Cell();

  sheetView: SheetView = new SheetView();

  constructor(public name?: string) { }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): Sheet {
    if (!json) {
      return null;
    }
    
    var sheet: Sheet = new Sheet();

    _.forOwn(json.columns, (col, colIndex) => {
      sheet.columns[colIndex] = new Column().fromJSON(col);
    });
    _.forOwn(json.rows, (row, rowIndex) => {
      sheet.rows[rowIndex] = new Row().fromJSON(row);
    });
    _.forOwn(json.cells, (v1, colIndex) => {
      var colObj: { [rowIndex: number]: Cell } = {};
      _.forOwn(v1, (v2, rowIndex) => {
        colObj[rowIndex] = new Cell().fromJSON(v2);
      });
      sheet.cells[colIndex] = colObj;
    });

    sheet.defaultColumn = new Column().fromJSON(json.defaultColumn);
    sheet.defaultRow = new Row().fromJSON(json.defaultRow);
    sheet.defaultCell = new Cell().fromJSON(json.defaultCell);
    sheet.sheetView = new SheetView().fromJSON(json.sheetView);
    sheet.name = json.name;
    
    return sheet;
  }

}

import { SelectedCellPosition } from "app/spread-sheet";
import { Serializable } from "app/common/utils";

export class SheetView implements Serializable {

  viewScrollTop: number = 0;

  viewScrollLeft: number = 0;

  sheetViewTop: number = 0;

  sheetViewLeft: number = 0;

  edgeColIndex: number;

  edgeRowIndex: number;

  areaWidth: number;

  areaHeight: number;

  sheetViewColumnList: number[] = [1];

  sheetViewRowList: number[] = [1];

  selectedCellPosition: SelectedCellPosition = new SelectedCellPosition(1, 1, 1, 1, 1, 1);

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): SheetView {
    if (!json) {
      return null;
    }
    
    var sheetView: SheetView = new SheetView();

    sheetView.viewScrollTop = json.viewScrollTop;
    sheetView.viewScrollLeft = json.viewScrollLeft;
    sheetView.sheetViewTop = json.sheetViewTop;
    sheetView.sheetViewLeft = json.sheetViewLeft;
    sheetView.edgeColIndex = json.edgeColIndex;
    sheetView.edgeRowIndex = json.edgeRowIndex;
    sheetView.areaWidth = json.areaWidth;
    sheetView.areaHeight = json.areaHeight;
    sheetView.sheetViewColumnList = json.sheetViewColumnList;
    sheetView.sheetViewRowList = json.sheetViewRowList;
    sheetView.selectedCellPosition = new SelectedCellPosition().fromJSON(json.selectedCellPosition);

    return sheetView;
  }

}

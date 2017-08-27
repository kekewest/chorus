import { Component, ElementRef, OnInit, AfterViewChecked, HostBinding } from '@angular/core';
import { SheetViewStoreService } from "app/spread-sheet/services";
import { Column, Row, Cell, Border, RGBAColor, SpreadSheetConsts, SelectedCellPosition } from "app/spread-sheet";
import { Payload } from "app/common/base";
import { _ } from "app";

@Component({
  selector: '[wf-sheet-view-canvas]',
  templateUrl: './sheet-view-canvas.component.html',
  styleUrls: ['./sheet-view-canvas.component.scss']
})
export class SheetViewCanvasComponent implements OnInit, AfterViewChecked {

  @HostBinding('attr.width')
  private _sheetViewWidthAttr: number;

  @HostBinding('attr.height')
  private _sheetViewHeightAttr: number;

  @HostBinding('style.width.px')
  private _sheetViewWidthStyle: number;

  @HostBinding('style.height.px')
  private _sheetViewHeightStyle: number;

  @HostBinding('style.top.px')
  private _sheetViewTop: number;

  @HostBinding('style.left.px')
  private _sheetViewLeft: number;

  private _sheetViewStage: createjs.Stage;

  private _defaultBorder: Border;

  private _defaultSelectedBorder: Border;

  private _selectedCellBackgroundColor: RGBAColor = new RGBAColor(0, 0, 0, 0.1);

  private _selectedCellPos: SelectedCellPosition;

  constructor(private el: ElementRef, private sheetViewStoreService: SheetViewStoreService) { }

  ngOnInit() {
    this.initDefaultBorder();

    this.sheetViewStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetViewStoreService.UPDATE_EVENT:
            this.updateSheetViewInfo();
            break;
        }
      }
    );
  }

  ngAfterViewChecked() {
    if (this._sheetViewStage) {
      this.drawSheetView();
    }
  }

  private initDefaultBorder() {
    this._defaultBorder = new Border();
    this._defaultBorder.borderBottom = true;
    this._defaultBorder.borderBottomColor = new RGBAColor(233, 233, 233, 1);
    this._defaultBorder.borderBottomStyle = "solid";
    this._defaultBorder.borderBottomWidth = 1;
    this._defaultBorder.borderRight = true;
    this._defaultBorder.borderRightColor = new RGBAColor(233, 233, 233, 1);
    this._defaultBorder.borderRightStyle = "solid";
    this._defaultBorder.borderRightWidth = 1;

    this._defaultSelectedBorder = new Border();
    this._defaultSelectedBorder.borderBottom = true;
    this._defaultSelectedBorder.borderBottomColor = new RGBAColor(200, 200, 200, 1);
    this._defaultSelectedBorder.borderBottomStyle = "solid";
    this._defaultSelectedBorder.borderBottomWidth = 1;
    this._defaultSelectedBorder.borderRight = true;
    this._defaultSelectedBorder.borderRightColor = new RGBAColor(200, 200, 200, 1);
    this._defaultSelectedBorder.borderRightStyle = "solid";
    this._defaultSelectedBorder.borderRightWidth = 1;
  }

  updateSheetViewInfo() {
    if (!this._sheetViewStage) {
      this._sheetViewStage = new createjs.Stage(this.el.nativeElement);
    }
    if (window.devicePixelRatio) {
      this._sheetViewStage.scaleX = this._sheetViewStage.scaleY = window.devicePixelRatio;
    }

    this._sheetViewWidthStyle = this.sheetViewStoreService.sheetViewWidth;
    this._sheetViewHeightStyle = this.sheetViewStoreService.sheetViewHeight;
    if (window.devicePixelRatio) {
      this._sheetViewWidthAttr = this._sheetViewWidthStyle * window.devicePixelRatio;
      this._sheetViewHeightAttr = this._sheetViewHeightStyle * window.devicePixelRatio;
    } else {
      this._sheetViewWidthAttr = this._sheetViewWidthStyle;
      this._sheetViewHeightAttr = this._sheetViewHeightStyle;
    }
    this._sheetViewTop = this.sheetViewStoreService.sheetViewTop;
    this._sheetViewLeft = this.sheetViewStoreService.sheetViewLeft;
    this._selectedCellPos = this.sheetViewStoreService.selectedCellPos;
  }

  private drawSheetView() {
    this._sheetViewStage.removeAllChildren();
    this.drawCell();
    this.drawCellBorder();
    this._sheetViewStage.update();
  }

  private drawCell() {
    var shape: createjs.Shape = new createjs.Shape();
    this._sheetViewStage.addChild(shape);

    var colNum: number;
    var rowNum: number;
    _.forEach(this.sheetViewStoreService.cellPosLeftList, (left, colIdx) => {
      colNum = this.sheetViewStoreService.sheetViewColumnList[colIdx];
      _.forEach(this.sheetViewStoreService.cellPosTopList, (top, rowIdx) => {
        rowNum = this.sheetViewStoreService.sheetViewRowList[rowIdx];
        this.drawCellRect(left, top, colNum, rowNum, shape.graphics);
      });
    });
  }

  private drawCellRect(posX: number, posY: number, colNum: number, rowNum: number, graphics: createjs.Graphics) {
    var width: number = this.sheetViewStoreService.getColumn(colNum).width;
    var height: number = this.sheetViewStoreService.getRow(rowNum).height;

    this.setCellBackgroundColor(colNum, rowNum, graphics);
    graphics.drawRect(posX, posY, width, height);
    if (this._selectedCellPos.contains(colNum, rowNum) && !this._selectedCellPos.isClickCell(colNum, rowNum)) {
      graphics.beginFill(this._selectedCellBackgroundColor.toString());
      graphics.drawRect(posX, posY, width, height);
    }
  }

  private setCellBackgroundColor(colNum: number, rowNum: number, graphics: createjs.Graphics) {
    var cell: Cell = this.sheetViewStoreService.getCell(colNum, rowNum);
    if (cell.backgroundColor) {
      graphics.beginFill(cell.backgroundColor.toString());
      return;
    }

    var row: Row = this.sheetViewStoreService.getRow(rowNum);
    if (row.backgroundColor) {
      graphics.beginFill(row.backgroundColor.toString());
      return;
    }

    var column: Column = this.sheetViewStoreService.getColumn(colNum);
    if (column.backgroundColor) {
      graphics.beginFill(column.backgroundColor.toString());
      return;
    }

    graphics.beginFill(null);
  }

  private drawCellBorder() {
    var posX: number = 0;
    var posY: number = 0;
    var textWidthStack: number = 0;
    var isDisplayedLeftBorder: boolean = false;
    var shape = new createjs.Shape();
    this._sheetViewStage.addChild(shape);

    for (var rowNum of this.sheetViewStoreService.sheetViewRowList) {
      var height: number = this.sheetViewStoreService.getRow(rowNum).height;
      posX = 0;
      textWidthStack = 0;
      isDisplayedLeftBorder = false;
      for (var colNum of this.sheetViewStoreService.sheetViewColumnList) {
        var width: number = this.sheetViewStoreService.getColumn(colNum).width;

        if (this.sheetViewStoreService.getCell(colNum, rowNum).value) {
          textWidthStack = this.sheetViewStoreService.getTextMetrics(colNum, rowNum).width + SpreadSheetConsts.MAX_BORDER_WIDRH;
        }
        textWidthStack -= width;
        if (textWidthStack <= 0) {
          this.drawCellBorderRight(colNum, rowNum, posY, posY + height, posX + width, shape.graphics);
          this.drawCellBorderBottom(colNum, rowNum, posX, posX + width, posY + height, shape.graphics, isDisplayedLeftBorder, true);
          textWidthStack = 0;
          isDisplayedLeftBorder = true;
        } else {
          this.drawCellBorderBottom(colNum, rowNum, posX, posX + width, posY + height, shape.graphics, isDisplayedLeftBorder, false);
          isDisplayedLeftBorder = false;
        }

        posX += width;
      }
      posY += height;
    }
  }

  private getCellBorderRight(colNum: number, rowNum: number): Border {
    var cell: Cell = this.sheetViewStoreService.getCell(colNum, rowNum);
    if (cell.border.borderRight) {
      return cell.border;
    }

    var column: Column = this.sheetViewStoreService.getColumn(colNum);
    if (column.border.borderRight) {
      return column.border;
    }

    if (this._selectedCellPos.contains(colNum, rowNum)) {
      return this._defaultSelectedBorder;
    }
    return this._defaultBorder;
  }

  private getCellBorderBottom(colNum: number, rowNum: number): Border {
    var cell: Cell = this.sheetViewStoreService.getCell(colNum, rowNum);
    if (cell.border.borderBottom) {
      return cell.border;
    }

    var row: Row = this.sheetViewStoreService.getRow(rowNum);
    if (row.border.borderBottom) {
      return row.border;
    }

    if (this._selectedCellPos.contains(colNum, rowNum)) {
      return this._defaultSelectedBorder;
    }
    return this._defaultBorder;
  }

  private drawCellBorderRight(colNum: number, rowNum: number, topY: number, bottomY: number, x: number, graphics: createjs.Graphics) {
    var border: Border = this.getCellBorderRight(colNum, rowNum);
    if (!border.borderRight) {
      return;
    }

    var shift: number = 0;
    if (border.borderRightWidth % 2 == 1) {
      shift = 0.5;
    }

    graphics.beginStroke(border.borderRightColor.toString());
    graphics.setStrokeStyle(border.borderRightWidth);
    graphics.moveTo(x + shift, topY - this.getBorderRightShiftTop(colNum, rowNum, border.borderRightWidth) + shift);
    graphics.lineTo(x + shift, bottomY + this.getBorderRightShiftBottom(colNum, rowNum, border.borderRightWidth) + shift);
    graphics.endStroke();
  }

  private getBorderRightShiftTop(colNum: number, rowNum: number, borderRightWidth: number): number {
    var otherBorder: Border;
    var topEdgeMax: number = 0;
    var topEdgeSecondMax: number = 0;
    var topWidth: number = 0;

    otherBorder = this.getCellBorderRight(colNum, rowNum - 1);
    topWidth = otherBorder.borderRightWidth;
    if (otherBorder.borderRight && topEdgeSecondMax < otherBorder.borderRightWidth) {
      if (topEdgeMax < otherBorder.borderRightWidth) {
        topEdgeSecondMax = topEdgeMax;
        topEdgeMax = otherBorder.borderRightWidth;
      } else {
        topEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderBottom(colNum, rowNum - 1);
    if (otherBorder.borderBottom && topEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (topEdgeMax < otherBorder.borderBottomWidth) {
        topEdgeSecondMax = topEdgeMax;
        topEdgeMax = otherBorder.borderBottomWidth;
      } else {
        topEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderBottom(colNum + 1, rowNum - 1);
    if (otherBorder.borderBottom && topEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (topEdgeMax < otherBorder.borderBottomWidth) {
        topEdgeSecondMax = topEdgeMax;
        topEdgeMax = otherBorder.borderBottomWidth;
      } else {
        topEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }

    if (borderRightWidth >= topEdgeMax) {
      return topEdgeMax / 2.0;
    } else if (topWidth == topEdgeMax) {
      return topEdgeSecondMax / -2.0;
    } else {
      return topEdgeMax / -2.0;
    }
  }

  private getBorderRightShiftBottom(colNum: number, rowNum: number, borderRightWidth: number): number {
    var otherBorder: Border;
    var bottomEdgeMax: number = 0;
    var bottomEdgeSecondMax: number = 0;
    var bottomWidth: number = 0;

    otherBorder = this.getCellBorderBottom(colNum + 1, rowNum);
    if (otherBorder.borderBottom && bottomEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (bottomEdgeMax < otherBorder.borderBottomWidth) {
        bottomEdgeSecondMax = bottomEdgeMax;
        bottomEdgeMax = otherBorder.borderBottomWidth;
      } else {
        bottomEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum, rowNum + 1);
    bottomWidth = otherBorder.borderRightWidth;
    if (otherBorder.borderRight && bottomEdgeSecondMax < otherBorder.borderRightWidth) {
      if (bottomEdgeMax < otherBorder.borderRightWidth) {
        bottomEdgeSecondMax = bottomEdgeMax;
        bottomEdgeMax = otherBorder.borderRightWidth;
      } else {
        bottomEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderBottom(colNum, rowNum);
    if (otherBorder.borderBottom && bottomEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (bottomEdgeMax < otherBorder.borderBottomWidth) {
        bottomEdgeSecondMax = bottomEdgeMax;
        bottomEdgeMax = otherBorder.borderBottomWidth;
      } else {
        bottomEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }

    if (borderRightWidth >= bottomEdgeMax) {
      return bottomEdgeMax / 2.0;
    } else if (bottomWidth == bottomEdgeMax) {
      return bottomEdgeSecondMax / -2.0;
    } else {
      return bottomEdgeMax / -2.0;
    }
  }

  private drawCellBorderBottom(colNum: number, rowNum: number, leftX: number, rightX: number, y: number, graphics: createjs.Graphics, isDisplayedLeftBorder: boolean, isDisplayedRightBorder: boolean) {
    var border: Border = this.getCellBorderBottom(colNum, rowNum);
    if (!border.borderBottom) {
      return;
    }

    var shift: number = 0;
    if (border.borderBottomWidth % 2 == 1) {
      shift = 0.5;
    }

    graphics.beginStroke(border.borderBottomColor.toString());
    graphics.setStrokeStyle(border.borderBottomWidth);
    graphics.moveTo(leftX - (isDisplayedLeftBorder ? this.getBorderBottomShiftLeft(colNum, rowNum, border.borderBottomWidth) : 0) + shift, y + shift);
    graphics.lineTo(rightX + (isDisplayedRightBorder ? this.getBorderBottomShiftRight(colNum, rowNum, border.borderBottomWidth) : 0) + shift, y + shift);
    graphics.endStroke();
  }

  private getBorderBottomShiftLeft(colNum: number, rowNum: number, borderBottomWidth: number): number {
    var otherBorder: Border;
    var leftEdgeMax: number = 0;
    var leftEdgeSecondMax: number = 0;
    var leftWidth: number = 0;

    otherBorder = this.getCellBorderBottom(colNum - 1, rowNum);
    leftWidth = otherBorder.borderBottomWidth;
    if (otherBorder.borderBottom && leftEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (leftEdgeMax < otherBorder.borderBottomWidth) {
        leftEdgeSecondMax = leftEdgeMax;
        leftEdgeMax = otherBorder.borderBottomWidth;
      } else {
        leftEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum - 1, rowNum);
    if (otherBorder.borderRight && leftEdgeSecondMax < otherBorder.borderRightWidth) {
      if (leftEdgeMax < otherBorder.borderRightWidth) {
        leftEdgeSecondMax = leftEdgeMax;
        leftEdgeMax = otherBorder.borderRightWidth;
      } else {
        leftEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum - 1, rowNum + 1);
    if (otherBorder.borderRight && leftEdgeSecondMax < otherBorder.borderRightWidth) {
      if (leftEdgeMax < otherBorder.borderRightWidth) {
        leftEdgeSecondMax = leftEdgeMax;
        leftEdgeMax = otherBorder.borderRightWidth;
      } else {
        leftEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }

    if (borderBottomWidth >= leftEdgeMax) {
      return leftEdgeMax / 2.0;
    } else if (leftWidth == leftEdgeMax) {
      return leftEdgeSecondMax / -2.0;
    } else {
      return leftEdgeMax / -2.0;
    }
  }

  private getBorderBottomShiftRight(colNum: number, rowNum: number, borderBottomWidth: number): number {
    var otherBorder: Border;
    var rightEdgeMax: number = 0;
    var rightEdgeSecondMax: number = 0;
    var rightWidth: number = 0;

    otherBorder = this.getCellBorderBottom(colNum + 1, rowNum);
    rightWidth = otherBorder.borderBottomWidth;
    if (otherBorder.borderBottom && rightEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (rightEdgeMax < otherBorder.borderBottomWidth) {
        rightEdgeSecondMax = rightEdgeMax;
        rightEdgeMax = otherBorder.borderBottomWidth;
      } else {
        rightEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum, rowNum + 1);
    if (otherBorder.borderRight && rightEdgeSecondMax < otherBorder.borderRightWidth) {
      if (rightEdgeMax < otherBorder.borderRightWidth) {
        rightEdgeSecondMax = rightEdgeMax;
        rightEdgeMax = otherBorder.borderRightWidth;
      } else {
        rightEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum, rowNum);
    if (otherBorder.borderRight && rightEdgeMax < otherBorder.borderRightWidth) {
      if (rightEdgeMax < otherBorder.borderRightWidth) {
        rightEdgeSecondMax = rightEdgeMax;
        rightEdgeMax = otherBorder.borderRightWidth;
      } else {
        rightEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }

    if (borderBottomWidth >= rightEdgeMax) {
      return rightEdgeMax / 2.0;
    } else if (rightWidth == rightEdgeMax) {
      return rightEdgeSecondMax / -2.0;
    } else {
      return rightEdgeMax / -2.0;
    }
  }

}

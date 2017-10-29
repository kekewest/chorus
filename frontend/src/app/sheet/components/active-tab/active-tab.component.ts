import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { Payload } from "app/common/base/emitter";

@Component({
  selector: 'cr-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("activeTabView")
  _activeTabViewRef: ElementRef;

  @ViewChild("activeTabArea")
  _activeTabArea: ElementRef;

  private _activeTabViewEl: HTMLElement;

  private _height: number;

  private _width: number;

  areaWidth: number;

  areaHeight: number;

  elementOrder: string[];

  constructor(
    private sheetActionService: SheetActionService,
    private sheetStoreService: SheetStoreService
  ) { }

  ngOnInit() {
    this.sheetStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetStoreService.SELECT_TAB_EVENT:
            this.onSelectTab();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this._activeTabViewEl = this._activeTabViewRef.nativeElement;
    var rect: ClientRect = this._activeTabViewEl.getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;
    this.areaHeight = this._height * 1.1;
    this.areaWidth = this._width * 1.1;
  }

  ngAfterViewChecked() {
    
  }

  @HostListener('window:resize')
  onWindowResize() {
    var rect: ClientRect = this._activeTabViewEl.getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;
  }

  onScroll() {
    var scrollTop: number = this._activeTabViewEl.scrollTop;
    var scrollLeft: number = this._activeTabViewEl.scrollLeft;
    this.areaHeight = this._height * 1.1 + scrollTop;
    this.areaWidth = this._width * 1.1 + scrollLeft;
  }

  onClick(e: MouseEvent) {
    this.sheetActionService.clickSheet(this.getMousePos(e), e);
  }

  private getMousePos(e: MouseEvent): {x: number, y: number} {
    var x: number = e.offsetX;
    var y: number = e.offsetY;

    var element: HTMLElement = <HTMLElement>e.target;
    while (true) {
      if (element.tagName === this._activeTabArea.nativeElement.tagName) {
        break;
      }
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.parentElement;
      if (!element) {
        break;
      }
    }

    return {x: x, y: y};
  }

  onSelectTab() {
    this.elementOrder = this.sheetStoreService.selectedTab.elementOrder;
  }

}

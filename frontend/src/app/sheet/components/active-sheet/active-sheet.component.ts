import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Payload } from "app/common/base";

@Component({
  selector: 'cr-active-sheet',
  templateUrl: './active-sheet.component.html',
  styleUrls: ['./active-sheet.component.scss'],
})
export class ActiveSheetComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("activeSheetView")
  private _activeSheetViewRef: ElementRef;

  private _activeSheetViewEl: HTMLElement;

  private _height: number;

  private _width: number;

  areaWidth: number;

  areaHeight: number;

  constructor(
    
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this._activeSheetViewEl = this._activeSheetViewRef.nativeElement;
    var rect: ClientRect = this._activeSheetViewEl.getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;
    this.areaHeight = this._height * 1.1;
    this.areaWidth = this._width * 1.1;
  }

  ngAfterViewChecked() {
    
  }

  @HostListener('window:resize')
  private onWindowResize() {
    var rect: ClientRect = this._activeSheetViewEl.getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;
  }

  onScroll() {
    var scrollTop: number = this._activeSheetViewEl.scrollTop;
    var scrollLeft: number = this._activeSheetViewEl.scrollLeft;
    this.areaHeight = this._height * 1.1 + scrollTop;
    this.areaWidth = this._width * 1.1 + scrollLeft;
  }

}

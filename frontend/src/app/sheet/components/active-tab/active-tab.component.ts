import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Payload } from "app/common/base";

@Component({
  selector: 'cr-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("activeTabView")
  private _activeTabViewRef: ElementRef;

  private _activeTabViewEl: HTMLElement;

  private _height: number;

  private _width: number;

  areaWidth: number;

  areaHeight: number;

  constructor(
    
  ) { }

  ngOnInit() {
    
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
  private onWindowResize() {
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

}

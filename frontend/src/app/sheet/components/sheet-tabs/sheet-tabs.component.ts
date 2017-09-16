import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { Payload } from "app/common/base";

@Component({
  selector: 'cr-sheet-tabs',
  templateUrl: './sheet-tabs.component.html',
  styleUrls: ['./sheet-tabs.component.scss'],
  providers: [
  ]
})
export class SheetTabsComponent implements OnInit, AfterViewChecked {

  isLoadedSpreadSheet: boolean = false;

  sheetOrder: string[] = [];

  private _needScroll: boolean = false;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewChecked() {
    if (this._needScroll) {
      var width: number = (<HTMLElement>this.el.nativeElement).querySelector(".nav-tabs").getBoundingClientRect().width;
      (<HTMLElement>this.el.nativeElement).querySelector("tabset").scrollLeft = width;
      this._needScroll = false;
    }
  }

  init() {
    
  }

  createNewSheet() {
    
  }

  selectSheet(sheetName: string) {
    
  }

  isActiveTab(sheetName: string): boolean {
    return true;
  }

}

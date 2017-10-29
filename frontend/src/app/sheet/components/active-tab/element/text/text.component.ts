import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ElementComponent } from "app/sheet/components/active-tab/element/element.component";
import { Text } from "app/sheet/element/text";

@Component({
  selector: 'cr-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends ElementComponent implements AfterViewInit {

  @Input()
  element: Text;

  textFormCtrl: FormControl = new FormControl();

  @ViewChild("textArea")
  textAreaRef: ElementRef;

  private textAreaEl: HTMLElement;

  width: number = 100;

  height: number = 100;

  border: string = "1px solid transparent";

  backgroundColor: string = "transparent";

  resize: string = "none";

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.textFormCtrl.setValue(this.element.text);
    if (this.elementId === this.sheetStoreService.focusElementId) {
      this.onFocus();
    }
  }

  ngAfterViewInit() {
    this.textAreaEl = this.textAreaRef.nativeElement;
    if (this.elementId === this.sheetStoreService.focusElementId) {
      this.textAreaEl.focus();
    }
  }

  onMouseUp() {
    this.width = this.textAreaEl.offsetWidth;
    this.height = this.textAreaEl.offsetHeight;
  }

  onFocus() {
    this.border = "1px dotted #bfbfbf";
    this.resize = "both";
  }

  onBlur() {
    this.border = "1px solid transparent";
    this.resize = "none";
  }

}

import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementComponent } from "app/sheet/components/active-tab/element/element.component";
import { TextArea } from "app/sheet/element/text-area";
import { SheetActionService } from 'app/sheet/services/sheet-action.service';
import { SheetStoreService } from 'app/sheet/services/sheet-store.service';

@Component({
  selector: 'cr-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends ElementComponent {

  @Input()
  element: TextArea;

  border: string = "1px solid transparent";

  showHandle: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private sheetActionService: SheetActionService,
    private sheetStoreService: SheetStoreService    
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  isEditing(): boolean {
    return this.sheetStoreService.focusElementId === this.elementId;
  }

  onClickText() {
    this.sheetActionService.changeElementFocus(this.elementId, this.element);
  }

  onMouseEnter() {
    this.enableFocusBorder();
    this.showHandle = true;
  }

  onMouseLeave() {
    this.disableFocusBorder();
    this.showHandle = false;
  }

  enableFocusBorder() {
    this.border = "1px dotted #bfbfbf";
  }

  disableFocusBorder() {
    this.border = "1px solid transparent";
  }

  getSafeHtml(): SafeHtml {
    return this.element.getSafeHtmlCache(this.sanitizer);
  }

}

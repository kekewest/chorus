import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ElementComponent } from "app/sheet/components/active-tab/element/element.component";
import { TextArea } from "app/sheet/element/text-area";
import { ChangeTextCommand } from "app/sheet/services/edit-command/command/text-area/change-text-command";

@Component({
  selector: 'cr-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends ElementComponent implements AfterViewInit, AfterViewChecked {

  private static applyChangesTime: number = 1000;

  @Input()
  element: TextArea;

  textFormCtrl: FormControl = new FormControl();

  @ViewChild("textArea")
  textAreaRef: ElementRef;

  private textAreaEl: HTMLElement;

  border: string = "1px solid transparent";

  backgroundColor: string = "transparent";

  private applyChangesTimer: NodeJS.Timer = null;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.textFormCtrl.setValue(this.element.text);
    this.textFormCtrl.valueChanges.subscribe(
      () => {
        this.adjustTextAreaSize();
        this.onChanges();
      }
    );

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

  ngAfterViewChecked() {
    this.adjustTextAreaSize();
  }

  onMouseUp() {
    var rect: ClientRect = this.textAreaEl.getBoundingClientRect();
  }

  onFocus() {
    this.border = "1px dotted #bfbfbf";
  }

  onBlur() {
    this.border = "1px solid transparent";
  }

  onMouseEnter() {
    this.border = "1px dotted #bfbfbf";
  }

  onMouseLeave() {
    this.border = "1px solid transparent";
  }

  adjustTextAreaSize() {
    this.textAreaEl.style.height = 'auto';
    this.textAreaEl.style.height = (this.textAreaEl.scrollHeight + 2) + 'px';
    this.textAreaEl.style.width = 'auto';
    this.textAreaEl.style.width = (this.textAreaEl.scrollWidth + 2) + 'px';
  }

  onChanges() {
    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
    }
    this.applyChangesTimer = setTimeout(() => {
      this.applyChanges();
    }, TextAreaComponent.applyChangesTime);
  }

  applyChanges() {
    var changeCommand: ChangeTextCommand = new ChangeTextCommand(
      this.sheetStoreService.selectedTabName,
      this.elementId,
      this.textFormCtrl.value
    );
    this.editCommandActionService.invokeEditCommand(changeCommand);
    this.applyChangesTimer = null;
  }

}

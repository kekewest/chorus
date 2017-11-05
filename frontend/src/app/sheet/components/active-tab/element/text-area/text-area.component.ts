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

  private static APPLY_CHANGES_TIME: number = 500;

  private static BODER_WIDTH: number = 1;

  @Input()
  element: TextArea;

  textFormCtrl: FormControl = new FormControl();

  @ViewChild("textArea")
  textAreaRef: ElementRef;

  private textAreaEl: HTMLElement;

  textAreaBorderWidth: number = TextAreaComponent.BODER_WIDTH;
  textAreaBorderStyle: string = "solid";
  textAreaBorderColor: string = "transparent";

  textAreaColor: string = "transparent";

  private applyChangesTimer: NodeJS.Timer = null;

  private textViewVisible: boolean = true;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.textFormCtrl.setValue(this.element.text);
    this.textFormCtrl.valueChanges.subscribe(
      () => {
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

  onFocus() {
    this.textViewVisible = false;

    this.textAreaBorderStyle = "dotted";
    this.textAreaBorderColor = "#bfbfbf";
    this.textAreaColor = "black";
    this.sheetActionService.changeElementFocus(this.elementId);
  }

  onBlur() {
    this.textViewVisible = true;

    this.textAreaBorderStyle = "solid";
    this.textAreaBorderColor = "transparent";
    this.textAreaColor = "transparent";

    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
      this.applyChanges();
    }

    this.sheetActionService.changeElementFocus(null);
  }

  onMouseEnter() {
    this.textAreaBorderStyle = "dotted";
    this.textAreaBorderColor = "#bfbfbf";
  }

  onMouseLeave() {
    if (this.elementId !== this.sheetStoreService.focusElementId) {
      this.textAreaBorderStyle = "solid";
      this.textAreaBorderColor = "transparent";
    }
  }

  adjustTextAreaSize() {
    this.textAreaEl.style.height = 'auto';
    this.textAreaEl.style.height = (this.textAreaEl.scrollHeight + TextAreaComponent.BODER_WIDTH * 2) + 'px';

    this.textAreaEl.style.width = 'auto';
    this.textAreaEl.style.width = (this.textAreaEl.scrollWidth + TextAreaComponent.BODER_WIDTH * 2) + 'px';
  }

  onChanges() {
    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
    }

    this.applyChangesTimer = setTimeout(() => {
      this.applyChanges();
    }, TextAreaComponent.APPLY_CHANGES_TIME);
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
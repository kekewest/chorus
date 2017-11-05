import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ChangeTextCommand } from "app/sheet/services/edit-command/command/text-area/change-text-command";
import { ElementEditorComponent } from "app/sheet/components/active-tab/element/element-editor.component";
import { Payload } from "app/common/base/emitter";
import { SheetAction } from "app/sheet/services/sheet-action";
import { SheetActionService } from "app/sheet/services/sheet-action.service";

@Component({
  selector: 'cr-text-area-editor',
  templateUrl: './text-area-editor.component.html',
  styleUrls: ['./text-area-editor.component.scss']
})
export class TextAreaEditorComponent extends ElementEditorComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private static ELEMENT_TYPE: string = "TextArea";
  private static APPLY_CHANGES_TIME: number = 500;
  private static BODER_WIDTH: number = 1;

  textFormCtrl: FormControl = new FormControl();

  @ViewChild("textArea")
  textAreaRef: ElementRef;

  private textAreaEl: HTMLElement;

  private applyChangesTimer: NodeJS.Timer = null;

  ngOnInit() {
    this.sheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetActionService.CLICK_SHEET_EVENT:
            this.showEditor(<SheetAction.ClickSheet>payload.data);
            break;
        }
      }
    );

    this.textFormCtrl.valueChanges.subscribe(
      () => {
        this.onChanges();
      }
    );
  }

  ngAfterViewInit() {
    this.textAreaEl = this.textAreaRef.nativeElement;
  }

  ngAfterViewChecked() {
    this.adjustTextAreaSize();
    if (!this.hidden) {
      this.textAreaEl.focus();
    }
  }

  showEditor(action: SheetAction.ClickSheet) {
    if (this.sheetStoreService.activeElementType !== TextAreaEditorComponent.ELEMENT_TYPE) {
      return;
    }
    
    this.posX = action.pos.x;
    this.posY = action.pos.y;
    this.hidden = false;
  }

  onBlur() {
    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
      this.applyChanges();
    }

    this.textFormCtrl.setValue("");
    this.hidden = true;
  }

  adjustTextAreaSize() {
    this.textAreaEl.style.height = 'auto';
    this.textAreaEl.style.height = (this.textAreaEl.scrollHeight + TextAreaEditorComponent.BODER_WIDTH * 2) + 'px';

    this.textAreaEl.style.width = 'auto';
    this.textAreaEl.style.width = (this.textAreaEl.scrollWidth + TextAreaEditorComponent.BODER_WIDTH * 2) + 'px';
  }

  onChanges() {
    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
    }

    this.applyChangesTimer = setTimeout(() => {
      this.applyChanges();
    }, TextAreaEditorComponent.APPLY_CHANGES_TIME);
  }

  applyChanges() {
    // var changeCommand: ChangeTextCommand = new ChangeTextCommand(
    //   this.sheetStoreService.selectedTabName,
    //   this.elementId,
    //   this.textFormCtrl.value
    // );
    // this.editCommandActionService.invokeEditCommand(changeCommand);
    this.applyChangesTimer = null;
  }

}

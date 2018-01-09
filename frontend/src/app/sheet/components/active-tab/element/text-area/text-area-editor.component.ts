import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ChangeTextCommand } from "app/sheet/services/edit-command/command/text-area/change-text-command";
import { ElementEditorComponent } from "app/sheet/components/active-tab/element/element-editor.component";
import { Payload } from "app/common/base/emitter";
import { SheetStoreService } from 'app/sheet/services/sheet-store.service';
import { SheetAction } from "app/sheet/services/sheet-action";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { UUID } from 'app/common/utils/uuid';
import { Subscription } from 'rxjs/Subscription';
import { TextArea } from 'app/sheet/element/text-area';
import { SheetDispatcherService } from 'app/sheet/services/sheet-dispatcher.service';
import { EditCommandActionService } from 'app/sheet/services/edit-command/edit-command-action.service';

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

  @ViewChild("handle")
  handleRef: ElementRef;

  @ViewChild("textArea")
  textAreaRef: ElementRef;

  private handleEl: HTMLElement;

  private textAreaEl: HTMLElement;

  private applyChangesTimer: NodeJS.Timer = null;

  private elementId: string;

  private changeSubscription: Subscription;

  private mouseOnHandle: boolean = false;

  constructor(
    private sheetDispatcherService: SheetDispatcherService,
    private sheetActionService: SheetActionService,
    private sheetStoreService: SheetStoreService,
    private editCommandActionService: EditCommandActionService
  ) {
    super();    
  }

  ngOnInit() {
    this.sheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetActionService.CLICK_SHEET_EVENT:
            this.showNewEditor(<SheetAction.ClickSheet>payload.data);
            break;
        }
      }
    );

    this.sheetStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetStoreService.CHANGE_ELEMENT_FOCUS_EVENT:
            this.showEditor();
            break;
        }
      }
    );

    this.elementId = UUID.v4();
  }

  ngAfterViewInit() {
    this.handleEl = this.handleRef.nativeElement;
    this.textAreaEl = this.textAreaRef.nativeElement;
  }

  ngAfterViewChecked() {
    this.adjustTextAreaSize();
    if (!this.hidden) {
      this.textAreaEl.focus();
    }
  }

  private showEditor() {
    if (!this.sheetStoreService.focusElement
      || this.sheetStoreService.focusElement.elementName !== TextAreaEditorComponent.ELEMENT_TYPE) {
      return;
    }

    var textArea: TextArea = <TextArea>this.sheetStoreService.focusElement;
    this.posX = textArea.posX;
    this.posY = textArea.posY;
    this.hidden = false;
    this.textFormCtrl.setValue(textArea.text);
    this.elementId = this.sheetStoreService.focusElementId;

    this.changeSubscription = this.textFormCtrl.valueChanges.subscribe(() => { this.onChanges(); });
  }

  private showNewEditor(action: SheetAction.ClickSheet) {
    if (this.sheetStoreService.activeElementType !== TextAreaEditorComponent.ELEMENT_TYPE) {
      return;
    }

    this.posX = action.pos.x;
    this.posY = action.pos.y;
    this.hidden = false;

    this.changeSubscription = this.textFormCtrl.valueChanges.subscribe(() => { this.onChanges(); });
    this.sheetActionService.changeElementFocus(this.elementId, null);
  }

  onMouseEnterHandle() {
    this.mouseOnHandle = true;
  }

  onMouseLeaveHandle() {
    this.mouseOnHandle = false;
  }

  onBlur() {
    if (this.mouseOnHandle) {
      return;
    }

    this.changeSubscription.unsubscribe();
    this.changeSubscription = null;

    if (this.sheetStoreService.focusElementId === this.elementId) {
      this.sheetActionService.changeElementFocus(null, null);
    }

    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
      this.applyChanges();
    }

    this.textFormCtrl.setValue("");
    this.elementId = UUID.v4();
    this.hidden = true;
  }

  private adjustTextAreaSize() {
    this.textAreaEl.style.height = 'auto';
    this.textAreaEl.style.height = (this.textAreaEl.scrollHeight + TextAreaEditorComponent.BODER_WIDTH * 2) + 'px';

    var width: string;
    this.textAreaEl.style.width = 'auto';
    width = (this.textAreaEl.scrollWidth + TextAreaEditorComponent.BODER_WIDTH * 2) + 'px';
    this.handleEl.style.width = width;
    this.textAreaEl.style.width = width;

  }

  private onChanges() {
    if (this.applyChangesTimer !== null) {
      clearTimeout(this.applyChangesTimer);
    }

    this.applyChangesTimer = setTimeout(() => {
      this.applyChanges();
    }, TextAreaEditorComponent.APPLY_CHANGES_TIME);
  }

  private applyChanges() {
    var changeCommand: ChangeTextCommand = new ChangeTextCommand(
      this.sheetStoreService.selectedTabName,
      this.elementId,
      this.textFormCtrl.value,
      this.posX,
      this.posY
    );
    this.editCommandActionService.invokeEditCommand(changeCommand);
    this.applyChangesTimer = null;
  }

}

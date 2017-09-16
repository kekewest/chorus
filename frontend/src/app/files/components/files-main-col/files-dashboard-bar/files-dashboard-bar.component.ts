import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { FilesStoreService, FilesActionService } from "app/common/services";
import { Payload } from "app/common/base";
import { ModalDirective } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { _ } from "app";
import { FilenameValidator } from "app/common/validators";

@Component({
  selector: 'wf-files-dashboard-bar',
  templateUrl: './files-dashboard-bar.component.html',
  styleUrls: ['./files-dashboard-bar.component.scss']
})
export class FilesDashboardBarComponent implements OnInit {

  @HostBinding("style.display")
  display: string = "none";

  @ViewChild('newModal')
  newModal: ModalDirective;

  @ViewChild('nameInput')
  nameInput: ElementRef;

  newModalType: string;

  createName: string = "";

  newModalForm: FormGroup;

  newModalFormErrorState: any = {
    "name": {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private filesActionService: FilesActionService,
    private filesStoreService: FilesStoreService,
    private filenameValidator: FilenameValidator
  ) { }

  ngOnInit() {
    this.filesStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesStoreService.ON_UNSPECIFIED_PATH_EVENT:
            this.hide();
            break;
          case FilesStoreService.LS_EVENT:
            this.show();
            break;
        }
      }
    );

    this.buildForm();
  }

  private buildForm() {
    this.newModalForm = this.formBuilder.group({
      "name": [this.createName,
        [
          this.filenameValidator.filename()
        ]
      ]
    });

    this.newModalForm.valueChanges.subscribe((data: any) => this.onNewModalFormChanged(data));
    this.onNewModalFormChanged();
  }

  private hide() {
    this.display = "none";
  }

  private show() {
    this.display = "block";
  }

  showNewModal(type: string) {
    this.newModalType = type;
    this.newModal.show();    
  }

  onShownNewModal() {
    this.nameInput.nativeElement.focus();
  }

  hideNewModal() {
    this.newModal.hide();
  }

  onHiddenNewModal() {
    this.newModalForm.reset();
  }

  onNewModalFormChanged(data?: any) {
    if (!this.newModalForm) {
      return;
    }

    for (var field in this.newModalFormErrorState) {
      this.newModalFormErrorState[field] = {};
      var control: AbstractControl = this.newModalForm.get(field);

      if (control && control.dirty && !control.valid) {
        for (var key in control.errors) {
          this.newModalFormErrorState[field][key] = true;
        }
      }
    }
  }

  onNewModalSubmit(event: Event) {
    event.preventDefault();
    this.createName = this.newModalForm.value.name;
    this.hideNewModal();

    switch (this.newModalType) {
      case "directory":
        this.createDirectory();
        break;
      case "spread-sheet":
        this.createSpreadSheet();
        break;
    }
  }

  createSpreadSheet() {
    // var spreadSheet: SpreadSheet = new SpreadSheet(this.createName, { "sheet1": new Sheet("sheet1") }, ["sheet1"], "sheet1");
    // var cell1: Cell = new Cell();
    // cell1.value = "200 200";

    // var cell2: Cell = new Cell();
    // cell2.value = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    // cell2.border.borderBottom = true;
    // cell2.border.borderBottomWidth = 3;
    // cell2.border.borderBottomStyle = "solid";
    // cell2.border.borderBottomColor = new RGBAColor(255, 0, 0, 1);
    // cell2.border.borderRight = true;
    // cell2.border.borderRightWidth = 2;
    // cell2.border.borderRightStyle = "solid";
    // cell2.border.borderRightColor = new RGBAColor(0, 255, 0, 1);
    // cell2.backgroundColor = new RGBAColor(255, 255, 0, 1);

    // var cell3: Cell = new Cell();
    // cell3.value = "KKKKKKKKKKKK";
    // cell3.border.borderBottom = true;
    // cell3.border.borderBottomWidth = 3;
    // cell3.border.borderBottomStyle = "solid";
    // cell3.border.borderBottomColor = new RGBAColor(255, 0, 0, 1);
    // cell3.border.borderRight = true;
    // cell3.border.borderRightWidth = 3;
    // cell3.border.borderRightStyle = "solid";
    // cell3.border.borderRightColor = new RGBAColor(0, 255, 0, 1);
    // cell3.backgroundColor = new RGBAColor(255, 255, 0, 1);

    // var cell4: Cell = new Cell();
    // cell4.value = "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK";
    // cell4.border.borderBottom = true;
    // cell4.border.borderBottomWidth = 2;
    // cell4.border.borderBottomStyle = "solid";
    // cell4.border.borderBottomColor = new RGBAColor(0, 0, 255, 1);
    // cell4.border.borderRight = true;
    // cell4.border.borderRightWidth = 2;
    // cell4.border.borderRightStyle = "solid";
    // cell4.border.borderRightColor = new RGBAColor(0, 0, 255, 1);
    // cell4.backgroundColor = new RGBAColor(255, 255, 0, 1);

    // spreadSheet.sheets["sheet1"].cells[200] = {};
    // spreadSheet.sheets["sheet1"].cells[200][200] = cell1;
    // spreadSheet.sheets["sheet1"].cells[3] = {};
    // spreadSheet.sheets["sheet1"].cells[3][3] = cell2;
    // spreadSheet.sheets["sheet1"].cells[5] = {};
    // spreadSheet.sheets["sheet1"].cells[5][3] = cell3;
    // spreadSheet.sheets["sheet1"].cells[5][4] = cell4;
    // spreadSheet.sheets["sheet1"].cells[6] = {};
    // spreadSheet.sheets["sheet1"].cells[6][3] = cell4;

    // this.filesActionService.newSpreadSheet(
    //   this.filesStoreService.currentArea,
    //   this.filesStoreService.currentNode.nodeId,
    //   this.createName,
    //   spreadSheet);
  }

  createDirectory() {
    this.filesActionService.newDirectory(
      this.filesStoreService.currentArea,
      this.filesStoreService.currentNode.nodeId,
      this.createName);
  }

}

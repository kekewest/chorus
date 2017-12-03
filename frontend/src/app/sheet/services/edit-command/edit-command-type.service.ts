import { Injectable } from '@angular/core';
import { CreateNewTabCommand } from "app/sheet/services/edit-command/command/sheet/create-new-tab-command";
import { ChangeTextCommand } from "app/sheet/services/edit-command/command/text-area/change-text-command";

@Injectable()
export class EditCommandTypeService {

  private editCommandConstructors: { [name: string]: any } = {};

  constructor() { 
    this.addEditCommandConstructor("CreateNewTabCommand", CreateNewTabCommand);
    this.addEditCommandConstructor("ChangeTextCommand", ChangeTextCommand);
  }

  private addEditCommandConstructor(name: string, editCommandConstructor: any) {
    this.editCommandConstructors[name] = editCommandConstructor;
  }

  getEditCommandConstructor(name: string): any {
    return this.editCommandConstructors[name];
  }

}

import { Injectable } from '@angular/core';
import { CreateTextAreaCommand } from "app/sheet/services/edit-command/command/text-area/create-text-area-command";
import { CreateNewTabCommand } from "app/sheet/services/edit-command/command/sheet/create-new-tab-command";

@Injectable()
export class EditCommandTypeService {

  private editCommandConstructors: { [name: string]: any } = {};

  constructor() { 
    this.addEditCommandConstructor("CreateNewTabCommand", CreateNewTabCommand);
    this.addEditCommandConstructor("CreateTextAreaCommand", CreateTextAreaCommand);
  }

  private addEditCommandConstructor(name: string, editCommandConstructor: any) {
    this.editCommandConstructors[name] = editCommandConstructor;
  }

  getEditCommandConstructor(name: string): any {
    return this.editCommandConstructors[name];
  }

  getDefaultInitCommandConstructor(): any {
    return CreateTextAreaCommand;
  }

}

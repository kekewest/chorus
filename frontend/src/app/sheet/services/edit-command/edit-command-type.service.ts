import { Injectable } from '@angular/core';
import { CreateNewTabCommand } from "app/sheet/services/edit-command/command/sheet";

@Injectable()
export class EditCommandTypeService {

  private editCommandConstructors: { [name: string]: any } = {};

  constructor() { 
    this.addEditCommandConstructor("CreateNewTabCommand", CreateNewTabCommand);
  }

  private addEditCommandConstructor(name: string, editCommandConstructor: any) {
    this.editCommandConstructors[name] = editCommandConstructor;
  }

  getEditCommandConstructor(name: string): any {
    return this.editCommandConstructors[name];
  }

}

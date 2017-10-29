import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from "@angular/forms";
import { _ } from "app";
import { FilesStoreService } from "app/common/services/store/files-store.service";
import { FilesAction } from "app/common/services/action/files-action";

@Injectable()
export class FilenameValidator {

  constructor(
    private filesStoreService: FilesStoreService
  ) {

  }

  filename(nodes?: FilesAction.Node[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var name: string = control.value;
      
      if (_.isEmpty(name)) {
        return {"required": {name}};
      }      
      if (name.search("/") > -1) {
        return {"invalidName": {name}};
      }

      var samename: boolean = false;
      var ns: FilesAction.Node[];
      if (nodes) {
        ns = nodes;
      } else {
        ns = this.filesStoreService.childNodes;
      }
      ns.forEach((node: FilesAction.Node) => {
        if (node.name === name) {
          samename = true;
        }
      });
      if (samename) {
        return {"sameName": {name}};
      }

      return null;
    };
  }

}
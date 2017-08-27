import { Pipe, PipeTransform } from '@angular/core';
import { _ } from "app";

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (_.isEmpty(value)) {
      return args;
    }
    
    return value;
  }

}

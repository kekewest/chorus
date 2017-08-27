import { Pipe, PipeTransform } from '@angular/core';
import { moment } from "app";

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    if (Array.isArray(value) && value.length > 6) {
      while (value.length > 6) {
        value.pop();
      }
    }

    return moment(value).format(args);
  }

}

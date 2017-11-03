import { Injectable } from '@angular/core';
import { ElementBase } from "app/sheet/element/element-base";
import { TextArea } from "app/sheet/element/text-area";
import { TextAreaComponent } from "app/sheet/components/active-tab/element/text-area/text-area.component";

@Injectable()
export class ElementTypeService {

  private static elementComponentConstructors: { [name: string]: any } = {};
  private static elementConstructors: { [name: string]: any } = {};

  constructor() {
    this.addElementComponentConstructor("TextArea", TextAreaComponent);
    this.addElementConstructor("TextArea", TextArea);
  }

  private addElementComponentConstructor(name: string, elementComponentConstructor: any) {
    ElementTypeService.elementComponentConstructors[name] = elementComponentConstructor;
  }

  private addElementConstructor(name: string, elementConstructor: any) {
    ElementTypeService.elementConstructors[name] = elementConstructor;
  }

  getElementComponentConstructor(name: string): any {
    return ElementTypeService.elementComponentConstructors[name];
  }

  getDefaultElementConstructor(): any {
    return TextArea;
  }

  static deserializeElement(elementJson: any): ElementBase {
    var elConstructor: any = ElementTypeService.elementConstructors[elementJson.elementName];
    return (<ElementBase> new elConstructor()).fromJSON(elementJson);
  }

}

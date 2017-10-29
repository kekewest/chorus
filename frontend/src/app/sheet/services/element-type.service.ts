import { Injectable } from '@angular/core';
import { ElementBase } from "app/sheet/element/element-base";
import { Text } from "app/sheet/element/text";
import { TextComponent } from "app/sheet/components/active-tab/element/text/text.component";

@Injectable()
export class ElementTypeService {

  private static elementComponentConstructors: { [name: string]: any } = {};
  private static elementConstructors: { [name: string]: any } = {};

  constructor() {
    this.addElementComponentConstructor("Text", TextComponent);
    this.addElementConstructor("Text", Text);
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
    return Text;
  }

  static deserializeElement(elementJson: any): ElementBase {
    var elConstructor: any = ElementTypeService.elementConstructors[elementJson.elementName];
    return (<ElementBase> new elConstructor()).fromJSON(elementJson);
  }

}

import { Injectable } from '@angular/core';
import { ElementBase, Text } from "app/sheet/elements";
import { TextComponent } from "app/sheet/components/active-tab/element";

@Injectable()
export class ElementTypeService {

  private static elementComponentConstructors: { [name: string]: any } = {};
  private static elementConstructors: { [name: string]: any } = {};

  constructor() {
    ElementTypeService.addElementComponentConstructor(Text, TextComponent);
    ElementTypeService.addElementConstructor(Text);
  }

  private static addElementComponentConstructor(elementConstructor: any, elementComponentConstructor: any) {
    ElementTypeService.elementComponentConstructors[elementConstructor.name] = elementComponentConstructor;
  }

  private static addElementConstructor(elementConstructor: any) {
    ElementTypeService.elementConstructors[elementConstructor.name] = elementConstructor;
  }

  static getElementComponentConstructor(element: ElementBase): any {
    return ElementTypeService.elementComponentConstructors[element.type];
  }

  static deserializeElement(elementJson: any): ElementBase {
    var elConstructor: any = ElementTypeService.elementConstructors[elementJson.type];
    return (<ElementBase> new elConstructor()).fromJSON(elementJson);
  }

}

import { Injectable } from '@angular/core';
import { ElementBase, Text } from "app/sheet/elements";
import { TextComponent } from "app/sheet/components/active-tab/element";

@Injectable()
export class ElementService {

  private elementComponentConstructors: { [name: string]: any } = {};

  constructor() {
    this.addElementComponentConstructor(Text, TextComponent);
  }

  private addElementComponentConstructor(elementelementComponentConstructor: any, elementComponentConstructor: any) {
    this.elementComponentConstructors[elementelementComponentConstructor.name] = elementComponentConstructor;
  }

  getElementComponentConstructor(element: ElementBase): any {
    return this.elementComponentConstructors[element.type];
  }

}

import { Injectable } from '@angular/core';
import { ElementBase } from "app/sheet/element/element-base";
import { TextArea } from "app/sheet/element/text-area";
import { TextAreaComponent } from "app/sheet/components/active-tab/element/text-area/text-area.component";
import { TextAreaEditorComponent } from "app/sheet/components/active-tab/element/text-area/text-area-editor.component";

@Injectable()
export class ElementTypeService {

  private static elementComponentConstructors: { [name: string]: any } = {};
  private static elementEditorComponentConstructors: { [name: string]: any } = {};  
  private static elementConstructors: { [name: string]: any } = {};

  constructor() {
    this.addElementComponentConstructor("TextArea", TextAreaComponent);

    this.addElementEditorComponentConstructor("TextArea", TextAreaEditorComponent);
    
    this.addElementConstructor("TextArea", TextArea);
  }

  private addElementComponentConstructor(name: string, elementComponentConstructor: any) {
    ElementTypeService.elementComponentConstructors[name] = elementComponentConstructor;
  }

  private addElementEditorComponentConstructor(name: string, elementEditorComponentConstructor: any) {
    ElementTypeService.elementEditorComponentConstructors[name] = elementEditorComponentConstructor;
  }

  private addElementConstructor(name: string, elementConstructor: any) {
    ElementTypeService.elementConstructors[name] = elementConstructor;
  }

  getElementComponentConstructor(name: string): any {
    return ElementTypeService.elementComponentConstructors[name];
  }

  getElementEditorComponentConstructors(): { [name: string]: any } {
    return ElementTypeService.elementEditorComponentConstructors;
  }

  getDefaultElementConstructor(): any {
    return TextArea;
  }

  static deserializeElement(elementJson: any): ElementBase {
    var elConstructor: any = ElementTypeService.elementConstructors[elementJson.elementName];
    return (<ElementBase> new elConstructor()).fromJSON(elementJson);
  }

}

import { ElementBase } from "app/sheet/element/element-base";

export class Text extends ElementBase {

  elementName: string = "Text";

  constructor(
    public text: string = ""
  ) {
    super();
  }

  fromJSON(json: any): Text {
    if (!json) {
      return null;
    }
    super.fromJSON(json);

    this.text = json.text;
    
    return this;
  }

}

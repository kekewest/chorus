import { ElementBase } from "app/sheet/element/element-base";

export class TextArea extends ElementBase {

  elementName: string = "TextArea";

  constructor(
    public text: string = ""
  ) {
    super();
  }

  fromJSON(json: any): TextArea {
    if (!json) {
      return null;
    }
    super.fromJSON(json);

    this.text = json.text;
    
    return this;
  }

}

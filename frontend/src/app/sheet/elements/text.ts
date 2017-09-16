
import { Serializable } from "app/common/utils";
import { ElementBase } from "app/sheet/elements";

export class Text extends ElementBase {

  constructor(
    public text?: string,
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

import { Serializable } from "app/common/utils";
import { ElementBase, Text } from "app/sheet/elements";

export class Tab implements Serializable {

  constructor(
    public elements?: ElementBase[]
  ) { }

  init(): Tab {
    this.elements = [];
    return this;
  }

  toJSON(): Tab {
    return this;
  }

  fromJSON(json: any): Tab {
    if (!json) {
      return null;
    }

    this.elements = [];
    for (var element of json.elements) {
      switch (element.type) {
        case Text.name:
          this.elements.push(new Text().fromJSON(element));
      }
    }
    
    return this;
  }

}


import { Serializable } from "app/common/utils";
import { ElementBase, Text } from "app/sheet/element";
import { ElementTypeService } from "app/sheet/services";

export class Tab implements Serializable {

  constructor(
    public elements?: { [id: string]: ElementBase },
    public elementOrder?: string[]
  ) { }

  init(): Tab {
    this.elements = {};
    this.elementOrder = [];
    return this;
  }

  toJSON(): Tab {
    return this;
  }

  fromJSON(json: any): Tab {
    if (!json) {
      return null;
    }

    this.elements = {};
    this.elementOrder = json.elementOrder;

    for (var id of json.elementOrder) {
      this.elements[id] = ElementTypeService.deserializeElement(json.elements[id]);
    }

    return this;
  }

}

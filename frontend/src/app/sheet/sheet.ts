
import { Tab } from "app/sheet/tab";
import { _ } from "app";
import { Serializable } from "app/common/utils/serializable";

export class Sheet implements Serializable {

  constructor(
    public name?: string,
    public tabs?: { [tabName: string]: Tab },
    public tabOrder?: string[],
    public selectedTabName?: string
  ) { }

  init(name: string): Sheet {
    this.tabs = {
      "Tab 1": new Tab().init()
    };
    this.tabOrder = ["Tab 1"];
    this.selectedTabName = "Tab 1";
    return this;
  }

  toJSON(): Sheet {
    return this;
  }

  fromJSON(json: any): Sheet {
    if (!json) {
      return null;
    }

    this.name = json.name;
    this.tabs = {};
    _.forOwn(json.tabs, (tab: string, tabName: string) => {
      this.tabs[tabName] = new Tab().fromJSON(tab);
    });
    this.tabOrder = json.tabOrder;
    this.selectedTabName = json.selectedTabName;

    return this;
  }

}

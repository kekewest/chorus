import { _ } from "app";
import { EditCommand } from "app/sheet/services/edit-command";
import { Tab } from "app/sheet";

export class CreateNewTabCommand extends EditCommand {

  commandName: string = "CreateNewTabCommand";

  private static TAB_NAME_PREFIX: string = "Tab";

  private tabName: string;
  private newTabIndex: number;

  invoke() {
    this.tabName = this.generateNewTabName();
    this.newTabIndex = this._sheetStoreService.tabOrder.indexOf(this._sheetStoreService.selectedTabName) + 1;
    this._sheetStoreService.tabOrder.splice(this.newTabIndex, 0, this.tabName);
    this._sheetStoreService.sheet.selectedTabName = this.tabName;
    this._sheetStoreService.sheet.tabs[this.tabName] = new Tab();
    this._sheetActionService.selectTab(this._sheetStoreService.selectedTabName);
  }

  undo() {
    if (this._sheetStoreService.selectedTabName === this.tabName) {
      var selectTabIndex: number = this._sheetStoreService.tabOrder.indexOf(this.tabName);
      if (selectTabIndex + 1 === this._sheetStoreService.tabOrder.length) {
        this._sheetStoreService.sheet.selectedTabName = this._sheetStoreService.tabOrder[selectTabIndex - 1];
      } else {
        this._sheetStoreService.sheet.selectedTabName = this._sheetStoreService.tabOrder[selectTabIndex + 1];
      }
      this._sheetActionService.selectTab(this._sheetStoreService.selectedTabName);
    }
    
    _.remove(this._sheetStoreService.tabOrder, (v: string) => v === this.tabName);
    delete this._sheetStoreService.tabs[this.tabName];
  }

  redo() {
    this._sheetStoreService.tabOrder.splice(this.newTabIndex, 0, this.tabName);
    this._sheetStoreService.tabs[this.tabName] = new Tab();
  }

  private generateNewTabName(): string {
    var nextTabCount: number = this._sheetStoreService.tabOrder.length + 1;
    var tabName: string = CreateNewTabCommand.TAB_NAME_PREFIX + nextTabCount;
    while(0 <= this._sheetStoreService.tabOrder.indexOf(tabName)) {
      nextTabCount++;
      tabName = CreateNewTabCommand.TAB_NAME_PREFIX + nextTabCount;
    }
    return tabName;
  }

  toJSON(): any {
    return this;
  }

  fromJSON(json: any): CreateNewTabCommand {
    if (!json) {
      return null;
    }

    this.tabName = json.tabName;
    this.newTabIndex = json.newTabIndex;

    return this;
  }

}
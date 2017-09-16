import { Injectable } from '@angular/core';
import { _ } from "app";
import { EditCommandActionService, EditCommand } from "app/sheet/services/command-actions";
import { SheetDispatcherService, SharedEditApiService } from "app/sheet/services";
import { Tab } from "app/sheet";

@Injectable()
export class CreateNewTabActionService extends EditCommandActionService {

  constructor(
    protected sheetDispatcherService: SheetDispatcherService,
    protected sharedEditApiService: SharedEditApiService
  ) {
    super(sheetDispatcherService, sharedEditApiService);
  }

  get commandName(): string {
    return "CreateNewTabCommand";
  }

  deserializeEditCommand(editCommandJsonStr: string): EditCommand {
    return new CreateNewTabCommand().fromJSON(JSON.parse(editCommandJsonStr));
  }

  createNewTab() {
    this.sendEditCommand(new CreateNewTabCommand());
  }

}

class CreateNewTabCommand extends EditCommand {

  private static TAB_NAME_PREFIX: string = "Tab";

  private tabName: string;
  private newTabIndex: number;

  invoke() {
    this.tabName = this.generateNewTabName();
    this.newTabIndex = this._sheet.tabOrder.indexOf(this._sheet.selectedTabName) + 1;
    this._sheet.tabOrder.splice(this.newTabIndex, 0, this.tabName);
    this._sheet.selectedTabName = this.tabName;
    this._sheet.tabs[this.tabName] = new Tab();
    this._sheetActionService.selectTab(this._sheet.selectedTabName);
  }

  undo() {
    if (this._sheet.selectedTabName === this.tabName) {
      var selectTabIndex: number = this._sheet.tabOrder.indexOf(this.tabName);
      if (selectTabIndex + 1 === this._sheet.tabOrder.length) {
        this._sheet.selectedTabName = this._sheet.tabOrder[selectTabIndex - 1];
      } else {
        this._sheet.selectedTabName = this._sheet.tabOrder[selectTabIndex + 1];
      }
      this._sheetActionService.selectTab(this._sheet.selectedTabName);
    }
    
    _.remove(this._sheet.tabOrder, (v: string) => v === this.tabName);
    delete this._sheet.tabs[this.tabName];
  }

  redo() {
    this._sheet.tabOrder.splice(this.newTabIndex, 0, this.tabName);
    this._sheet.tabs[this.tabName] = new Tab();
  }

  private generateNewTabName(): string {
    var nextTabCount: number = this._sheet.tabOrder.length + 1;
    var tabName: string = CreateNewTabCommand.TAB_NAME_PREFIX + nextTabCount;
    while(0 <= this._sheet.tabOrder.indexOf(tabName)) {
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
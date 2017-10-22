import { Serializable } from "app/common/utils";
import { SheetActionService, SheetStoreService } from "app/sheet/services";

export abstract class EditCommand implements Serializable {
  
    abstract commandName: string;
  
    protected _sheetActionService: SheetActionService;
    protected _sheetStoreService: SheetStoreService;
  
    set sheetStoreService(sheetStoreService: SheetStoreService) {
      this._sheetStoreService = sheetStoreService;
    }
  
    set sheetActionService(sheetActionService: SheetActionService) {
      this._sheetActionService = sheetActionService;
    }
  
    abstract invoke();
  
    abstract undo();
  
    abstract redo();
  
    abstract toJSON(): any;
  
    abstract fromJSON(json: any): EditCommand;
  
  }
  
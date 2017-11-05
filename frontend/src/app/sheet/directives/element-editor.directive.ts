import { Directive, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, OnInit } from '@angular/core';
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { ElementTypeService } from "app/sheet/services/element-type.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { EditCommandActionService } from "app/sheet/services/edit-command/edit-command-action.service";
import { ElementEditorComponent } from "app/sheet/components/active-tab/element/element-editor.component";
import * as _ from "lodash";

@Directive({
  selector: '[crElementEditor]'
})
export class ElementEditorDirective implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementTypeService: ElementTypeService,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetStoreService: SheetStoreService,
    private sheetActionService: SheetActionService,
    private editCommandActionService: EditCommandActionService
  
  ) { }

  ngOnInit(): void {
    var constructors: { [name: string]: any } = this.elementTypeService.getElementEditorComponentConstructors();
    
    _.forOwn(constructors, (cons: any, name: string) => {
      var componentFactory: ComponentFactory<{}> = this.componentFactoryResolver.resolveComponentFactory(cons);
      var componentRef: ComponentRef<{}> = this.viewContainerRef.createComponent(componentFactory);
      
      (<ElementEditorComponent>componentRef.instance).sheetDispatcherService = this.sheetDispatcherService;
      (<ElementEditorComponent>componentRef.instance).sheetStoreService = this.sheetStoreService;
      (<ElementEditorComponent>componentRef.instance).sheetActionService = this.sheetActionService;
      (<ElementEditorComponent>componentRef.instance).editCommandActionService = this.editCommandActionService;
    });
  }

}

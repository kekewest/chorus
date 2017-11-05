import { Directive, Input, ViewContainerRef, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { ElementTypeService } from "app/sheet/services/element-type.service";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { EditCommandActionService } from "app/sheet/services/edit-command/edit-command-action.service";
import { ElementComponent } from "app/sheet/components/active-tab/element/element.component";
import { ElementBase } from "app/sheet/element/element-base";

@Directive({
  selector: '[crElement]'
})
export class ElementDirective implements OnInit {

  @Input()
  elementId: string;

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
    var element: ElementBase = this.sheetStoreService.selectedTab.elements[this.elementId];
    var componentConstructor: any = this.elementTypeService.getElementComponentConstructor(element.elementName);
    var componentFactory: ComponentFactory<{}> = this.componentFactoryResolver.resolveComponentFactory(componentConstructor);
    var ComponentRef: ComponentRef<{}> = this.viewContainerRef.createComponent(componentFactory);
    (<ElementComponent>ComponentRef.instance).elementId = this.elementId;
    (<ElementComponent>ComponentRef.instance).element = element;
    (<ElementComponent>ComponentRef.instance).sheetDispatcherService = this.sheetDispatcherService;    
    (<ElementComponent>ComponentRef.instance).sheetStoreService = this.sheetStoreService;
    (<ElementComponent>ComponentRef.instance).sheetActionService = this.sheetActionService;
    (<ElementComponent>ComponentRef.instance).editCommandActionService = this.editCommandActionService;
  }

}

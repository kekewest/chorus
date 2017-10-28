import { Directive, Input, ViewContainerRef, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ReflectiveInjector } from '@angular/core';
import { ElementBase } from "app/sheet/element";
import { ElementTypeService, SheetStoreService, SheetActionService, SheetDispatcherService } from "app/sheet/services";
import { ElementComponent } from "app/sheet/components/active-tab/element";
import { EditCommandActionService } from "app/sheet/services/edit-command";

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

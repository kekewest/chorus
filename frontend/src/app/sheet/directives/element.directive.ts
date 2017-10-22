import { Directive, Input, ViewContainerRef, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { ElementBase } from "app/sheet/element";
import { ElementTypeService, SheetStoreService } from "app/sheet/services";
import { ElementComponent } from "app/sheet/components/active-tab/element";

@Directive({
  selector: '[crElement]'
})
export class ElementDirective implements OnInit {

  @Input()
  elementId: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sheetStoreService: SheetStoreService,
    private elementTypeService: ElementTypeService
  ) { }

  ngOnInit(): void {
    var element: ElementBase = this.sheetStoreService.selectedTab.elements[this.elementId];
    var componentConstructor: any = this.elementTypeService.getElementComponentConstructor(element.elementName);
    var componentFactory: ComponentFactory<{}> = this.componentFactoryResolver.resolveComponentFactory(componentConstructor);
    var ComponentRef: ComponentRef<{}> = this.viewContainerRef.createComponent(componentFactory);
    (<ElementComponent>ComponentRef.instance).element = element;
  }

}

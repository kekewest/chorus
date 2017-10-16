import { Directive, Input, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ElementBase } from "app/sheet/elements";
import { ElementService } from "app/sheet/services";
import { ElementComponent } from "app/sheet/components/active-tab/element";

@Directive({
  selector: '[crElement]'
})
export class ElementDirective implements OnInit {

  @Input()
  element: ElementBase;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementService: ElementService
  ) { }

  ngOnInit(): void {
    var componentConstructor: any = this.elementService.getElementComponentConstructor(this.element);
    var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentConstructor);
    var ComponentRef = this.viewContainerRef.createComponent(componentFactory);
    (<ElementComponent>ComponentRef.instance).element = this.element;
  }

}

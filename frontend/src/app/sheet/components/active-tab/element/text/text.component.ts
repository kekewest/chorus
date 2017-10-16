import { Component, OnInit, Input } from '@angular/core';
import { ElementComponent } from "app/sheet/components/active-tab/element";
import { Text } from "app/sheet/elements";

@Component({
  selector: 'cr-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements ElementComponent, OnInit {

  @Input()
  element: Text;

  constructor() { }

  ngOnInit() {
  }

}

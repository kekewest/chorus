import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wf-all-cell',
  templateUrl: './all-cell.component.html',
  styleUrls: ['./all-cell.component.scss']
})
export class AllCellComponent implements OnInit {

  @Input()
  sheetName: string;

  constructor() { }

  ngOnInit() {
  }

}

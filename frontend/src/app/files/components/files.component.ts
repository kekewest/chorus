import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { MeStoreService } from "app/common/services/store/me-store.service";

@Component({
  selector: 'wf-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
    
  }

}

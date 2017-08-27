import { Component, OnInit } from '@angular/core';
import { ApiService, ChorusDispatcherService, MeActionService, MeStoreService, FilesActionService, ErrorActionService, FilesStoreService } from "app/common/services";
import { FilenameValidator } from "app/common/validators";

@Component({
  selector: 'wf-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private chorusDispatcherService: ChorusDispatcherService,
    private errorActionService: ErrorActionService,
    private meActionService: MeActionService,
    private meStoreService: MeStoreService,
    private filesActionService: FilesActionService,
    private filesStoreService: FilesStoreService,
    private filenameValidator: FilenameValidator
  ) { }

  ngOnInit() {
  }

}

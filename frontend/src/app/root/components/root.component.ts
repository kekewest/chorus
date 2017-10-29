import { Component, OnInit } from '@angular/core';
import { ApiService } from "app/common/services/api.service";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { ErrorActionService } from "app/common/services/action/error-action.service";
import { MeActionService } from "app/common/services/action/me-action.service";
import { MeStoreService } from "app/common/services/store/me-store.service";
import { FilesActionService } from "app/common/services/action/files-action.service";
import { FilesStoreService } from "app/common/services/store/files-store.service";
import { FilenameValidator } from "app/common/validators/filename";

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

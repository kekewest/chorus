import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FilesActionService, FilesStoreService, ChorusDispatcherService } from "app/common/services";
import { Payload } from "app/common/base";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";

@Component({
  selector: 'wf-files-areas',
  templateUrl: './files-areas.component.html',
  styleUrls: ['./files-areas.component.scss']
})
export class FilesAreasComponent implements OnInit, AfterViewInit {

  areas: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chorusDispatcherService: ChorusDispatcherService,
    private filesActionService: FilesActionService,
    private filesStoreService: FilesStoreService
  ) { }

  ngOnInit() {
    this.filesStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesStoreService.GET_ALL_AREAS_EVENT:
            this.updateAreas();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "files-areas", show: true }
    });
    this.filesActionService.getAllAreas();
  }

  updateAreas() {
    this.areas = this.filesStoreService.areas;
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "files-areas", show: false }
    });
  }

  onSelectArea(areaName: string) {
    this.router.navigate(['/files'], { queryParams: { areaName: areaName, path: "" } });
  }

  isCurrentArea(areaName: string): boolean {
    if (areaName === this.filesStoreService.currentArea) {
      return true;
    } else {
      return false;
    }
  }

}

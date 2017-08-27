import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FilesActionService, FilesStoreService, FilesAction, ChorusDispatcherService } from "app/common/services";
import { Payload } from "app/common/base";
import { _, moment } from "app";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";

@Component({
  selector: 'wf-files-ls',
  templateUrl: './files-ls.component.html',
  styleUrls: ['./files-ls.component.scss']
})
export class FilesLsComponent implements OnInit, AfterViewInit {

  showFileList: boolean = false;

  childNodes: FilesAction.Node[];

  private _selectNodes: { [id: string]: FilesAction.Node } = {};

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
          case FilesStoreService.ON_UNSPECIFIED_PATH_EVENT:
            this.hideFileList();
            break;
          case FilesStoreService.LS_EVENT:
            this.setChildNodes();
            break;
        }
      }
    );

    this.chorusDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesActionService.NEW_SPREAD_SHEET_EVENT:
          case FilesActionService.NEW_DIRECTORY_EVENT:
            this.updateFileList();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params: Params) => {
      var areaName: string = params["areaName"];
      if (_.isEmpty(areaName)) {
        this.filesActionService.onUnspecifiedPath();
        return;
      }
      var path: string = params["path"];
      if (_.isEmpty(path)) {
        path = "";
      }
      this.chorusDispatcherService.emit({ 
        eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
        data: { name: "files-main-col", show: true }
      });
      this.filesActionService.ls(areaName, path);
    });
  }

  private hideFileList() {
    this.showFileList = false;
    this.childNodes = this.filesStoreService.childNodes;
    this._selectNodes = {};
  }

  private setChildNodes() {
    this.showFileList = true;
    this.childNodes = this.filesStoreService.childNodes;
    this._selectNodes = {};
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "files-main-col", show: false }
    });
  }

  private updateFileList() {
    this.filesActionService.ls(this.filesStoreService.currentArea, this.filesStoreService.currentPath);
  }

  isFile(node: FilesAction.Node): boolean {
    if (node.type === "file") {
      return true;
    } else {
      return false;
    }
  }

  isDirectory(node: FilesAction.Node): boolean {
    if (node.type === "directory") {
      return true;
    } else {
      return false;
    }
  }

  getNextDirParam(node: FilesAction.Node): { areaName: string, path: string } {
    var path: string;
    if (this.filesStoreService.currentPath === "/") {
      path = "/" + node.name;
    } else {
      path = this.filesStoreService.currentPath + "/" + node.name
    }

    return {
      areaName: this.filesStoreService.currentArea,
      path: path
    };
  }

  getSpreadSheetParam(node: FilesAction.Node): { id: string } {
    return { id: node.nodeId };
  }

  isSelectedNode(node: FilesAction.Node): boolean {
    if (this._selectNodes[node.nodeId]) {
      return true;
    } else {
      return false;
    }
  }

  changeSelectedNode(node: FilesAction.Node) {
    if (this._selectNodes[node.nodeId]) {
      delete this._selectNodes[node.nodeId];
    } else {
      this._selectNodes[node.nodeId] = node;
    }
  }

}

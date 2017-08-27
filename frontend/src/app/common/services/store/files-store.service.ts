import { Injectable } from '@angular/core';
import { ChorusDispatcherService, FilesActionService, FilesAction } from "app/common/services";
import { Payload, Emitter } from "app/common/base";
import { ActivatedRoute, Params } from "@angular/router";
import {s, _ } from "app";

@Injectable()
export class FilesStoreService extends Emitter<Payload> {

  private _areas: string[] = [];

  private _currentArea: string;

  private _currentPath: string;

  private _currentNode: FilesAction.Node;

  private _childNodes: FilesAction.Node[];

  static EVENT_PREFIX: string = "FilesStoreService.";
  static GET_ALL_AREAS_EVENT: string = FilesStoreService.EVENT_PREFIX + "get-all-areas";
  static ON_UNSPECIFIED_PATH_EVENT: string = FilesStoreService.EVENT_PREFIX + "on-unspecified-path";
  static LS_EVENT: string = FilesStoreService.EVENT_PREFIX + "ls";

  constructor(
    private route: ActivatedRoute,
    private chorusDispatcherService: ChorusDispatcherService
  ) {
    super();
    this.chorusDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesActionService.GET_ALL_AREAS_EVENT:
            this.setAreas(<FilesAction.GetAllAreas>payload.data);
            break;
          case FilesActionService.ON_UNSPECIFIED_PATH_EVENT:
            this.onUnspecifiedPath();
            break;
          case FilesActionService.LS_EVENT:
            this.setCurrentNodeInfo(<FilesAction.Ls>payload.data);
            break;
        }
      }
    );
  }

  get areas(): string[] {
    return this._areas;
  }

  get currentArea(): string {
    return this._currentArea;
  }

  get currentPath(): string {
    return this._currentPath;
  }

  get currentNode(): FilesAction.Node {
    return this._currentNode;
  }

  get childNodes(): FilesAction.Node[] {
    return this._childNodes;
  }

  private setAreas(action: FilesAction.GetAllAreas) {
    this._areas = action.areas;
    this.emit({ eventType: FilesStoreService.GET_ALL_AREAS_EVENT });
  }

  private onUnspecifiedPath() {
    this._childNodes = [];
    this._currentArea = null;
    this.emit({ eventType: FilesStoreService.ON_UNSPECIFIED_PATH_EVENT });
  }

  private setCurrentNodeInfo(action: FilesAction.Ls) {
    this._currentNode = action.currentNode;
    this._childNodes = action.childNodes;
    this.route.queryParams.subscribe((params: Params) => {
      this._currentArea = params["areaName"];
      this._currentPath = "/" + s.trim(params["path"], "/");
      this.emit({ eventType: FilesStoreService.LS_EVENT });
    });
  }

}

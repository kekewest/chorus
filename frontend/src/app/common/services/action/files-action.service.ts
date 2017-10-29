import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ApiService } from "app/common/services/api.service";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { ErrorActionService } from "app/common/services/action/error-action.service";
import { FilesAction } from "app/common/services/action/files-action";

@Injectable()
export class FilesActionService {

  static EVENT_PREFIX: string = "FilesActionService.";
  static GET_ALL_AREAS_EVENT: string = FilesActionService.EVENT_PREFIX + "get-all-areas";
  static ON_UNSPECIFIED_PATH_EVENT: string = FilesActionService.EVENT_PREFIX + "on-unspecified-path";
  static LS_EVENT: string = FilesActionService.EVENT_PREFIX + "ls";
  static NEW_SPREAD_SHEET_EVENT: string = FilesActionService.EVENT_PREFIX + "new-spread-sheet";
  static NEW_DIRECTORY_EVENT: string = FilesActionService.EVENT_PREFIX + "new-directory";

  constructor(
    private apiService: ApiService,
    private chorusDispatcherService: ChorusDispatcherService,
    private errorActionService: ErrorActionService
  ) { }

  getAllAreas() {
    this.apiService.get("files/all-areas").subscribe(
      (res: Response) => {
        var json: FilesAction.GetAllAreas = res.json();
        this.chorusDispatcherService.emit({
          eventType: FilesActionService.GET_ALL_AREAS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
    );
  }

  onUnspecifiedPath() {
    this.chorusDispatcherService.emit({
      eventType: FilesActionService.ON_UNSPECIFIED_PATH_EVENT
    });
  }

  ls(areaName: string, path: string) {
    this.apiService.get("files/ls", {
      areaname: areaName,
      path: path
    }).subscribe(
      (res: Response) => {
        var json: FilesAction.Ls = res.json();
        this.chorusDispatcherService.emit({
          eventType: FilesActionService.LS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
      );
  }

  newSpreadSheet(areaName: string, nodeId: string, filename: string, spreadSheet: any) {
    this.apiService.put("files/new/spread-sheet", 
    spreadSheet,
    {
      areaname: areaName,
      nodeId: nodeId,
      filename: filename
    }).subscribe(
      (res: Response) => {
        var json: FilesAction.NewNode = res.json();
        this.chorusDispatcherService.emit({
          eventType: FilesActionService.NEW_SPREAD_SHEET_EVENT,
          data: json
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
    );
  }

  newDirectory(areaName: string, nodeId: string, dirname: string) {
    this.apiService.put("files/new/directory", null,
    {
      areaname: areaName,
      nodeId: nodeId,
      dirname: dirname
    }).subscribe(
      (res: Response) => {
        var json: FilesAction.NewNode = res.json();
        this.chorusDispatcherService.emit({
          eventType: FilesActionService.NEW_DIRECTORY_EVENT,
          data: json
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ApiService } from "app/common/services/api.service";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { ErrorActionService } from "app/common/services/action/error-action.service";
import { MeAction } from "app/common/services/action/me-action";

@Injectable()
export class MeActionService {

  static EVENT_PREFIX: string = "MeActionService.";
  static LOGIN_SUCCESS_EVENT: string = MeActionService.EVENT_PREFIX + "login-success";
  static LOGIN_FAILED_EVENT: string = MeActionService.EVENT_PREFIX + "login-failed";
  static LOGOUT_EVENT: string = MeActionService.EVENT_PREFIX + "logout";
  static SYNC_STATUS_EVENT: string = MeActionService.EVENT_PREFIX + "sync-status";

  constructor(
    private apiService: ApiService,
    private chorusDispatcherService: ChorusDispatcherService,
    private errorActionService: ErrorActionService
  ) { }

  login(userName: string, password: string) {
    this.apiService.post("login", {
      userName: userName,
      password: password
    }).subscribe(
      (res: Response) => {
        var json: MeAction.LoggedIn = res.json();
        this.chorusDispatcherService.emit({
          eventType: MeActionService.LOGIN_SUCCESS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        var json: MeAction.LoggedIn = { active: false, authorities: [] };
        this.chorusDispatcherService.emit({
          eventType: MeActionService.LOGIN_FAILED_EVENT,
          data: json
        });
      }
      );
  }

  logout() {
    this.apiService.get("logout").subscribe(
      (res: Response) => {
        this.chorusDispatcherService.emit({
          eventType: MeActionService.LOGOUT_EVENT,
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
    );
  }

  syncStatus() {
    this.apiService.get("me/status").subscribe(
      (res: Response) => {
        var json: MeAction.LoggedIn = res.json();
        this.chorusDispatcherService.emit({
          eventType: MeActionService.SYNC_STATUS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        var json: MeAction.LoggedIn = { active: false, authorities: [] };
        this.chorusDispatcherService.emit({
          eventType: MeActionService.SYNC_STATUS_EVENT,
          data: json
        });
      }
    );
  }

}

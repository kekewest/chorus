import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Emitter, Payload } from "app/common/base/emitter";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { MeActionService } from "app/common/services/action/me-action.service";
import { MeAction } from "app/common/services/action/me-action";

@Injectable()
export class MeStoreService extends Emitter<Payload> implements CanActivate {

  static EVENT_PREFIX: string = "MeStoreService.";
  static LOGIN_SUCCESS_EVENT: string = MeStoreService.EVENT_PREFIX + "login-success";
  static LOGIN_FAILED_EVENT: string = MeStoreService.EVENT_PREFIX + "login-failed";
  static LOGOUT_EVENT: string = MeStoreService.EVENT_PREFIX + "logout";
  static SYNC_STATUS_EVENT: string = MeStoreService.EVENT_PREFIX + "sync-status";

  redirectUrl: string;

  private _active: boolean = false;
  private _authorities: string[] = [];

  constructor(
    private router: Router,
    private chorusDispatcherService: ChorusDispatcherService
  ) {
    super();
    this.chorusDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case MeActionService.LOGIN_SUCCESS_EVENT:
          case MeActionService.LOGIN_FAILED_EVENT:
            this.login(<MeAction.LoggedIn>payload.data);
            break;
          case MeActionService.LOGOUT_EVENT:
            this.logout();
            break;
          case MeActionService.SYNC_STATUS_EVENT:
            this.syncStatus(<MeAction.LoggedIn>payload.data);
            break;
        }
      }
    );
  }

  get active(): boolean {
    return this._active;
  }

  get authorities(): string[] {
    return this._authorities;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._active) {
      return true;
    }

    this.redirectUrl = state.url;
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private updateStatus(loggedIn: MeAction.LoggedIn) {
    this._active = loggedIn.active;
    this._authorities = loggedIn.authorities;
  }

  private login(action: MeAction.LoggedIn) {
    this.updateStatus(action);

    if (this._active) {
      this.emit({ eventType: MeStoreService.LOGIN_SUCCESS_EVENT })
    } else {
      this.emit({ eventType: MeStoreService.LOGIN_FAILED_EVENT })
    }
  }

  private logout() {
    this.redirectUrl = null;
    this._active = false;
    this._authorities = [];
    this.emit({ eventType: MeStoreService.LOGOUT_EVENT });
  }

  private syncStatus(action: MeAction.LoggedIn) {
    this.updateStatus(action);
    this.emit({ eventType: MeStoreService.SYNC_STATUS_EVENT });
  }

}

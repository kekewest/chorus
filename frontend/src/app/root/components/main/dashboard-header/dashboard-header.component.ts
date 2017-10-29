import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { MeActionService } from "app/common/services/action/me-action.service";
import { MeStoreService } from "app/common/services/store/me-store.service";
import { Payload } from "app/common/base/emitter";

@Component({
  selector: 'cr-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private chorusDispatcherService: ChorusDispatcherService,
    private meActionService: MeActionService,
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
    this.meStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case MeStoreService.LOGOUT_EVENT:
            this.afterLogout();
            break;
        }
      }
    );
  }

  isActive(): boolean {
    return this.meStoreService.active;
  }

  onLogout() {
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "main", show: true }
    });
    this.meActionService.logout();
  }

  private afterLogout() {
    this.router.navigate(['/login']);
    this.chorusDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "main", show: false }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MeStoreService, MeActionService, ChorusDispatcherService } from "app/common/services";
import { Payload } from "app/common/base";
import { Router } from "@angular/router";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";

@Component({
  selector: 'wf-dashboard-header',
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

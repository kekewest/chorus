import { Component, OnInit } from '@angular/core';
import { Router, UrlTree, PRIMARY_OUTLET } from "@angular/router";
import { MeActionService } from "app/common/services/action/me-action.service";
import { Payload } from "app/common/base/emitter";
import { MeStoreService } from "app/common/services/store/me-store.service";

@Component({
  selector: 'wf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private meActionService: MeActionService,
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
    this.meStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case MeStoreService.SYNC_STATUS_EVENT:
            this.onSync();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.meActionService.syncStatus();
  }

  onSync() {
    if (this.meStoreService.active && this.meStoreService.redirectUrl) {
      this.router.navigateByUrl(this.meStoreService.redirectUrl);
      this.meStoreService.redirectUrl = null;
    } else if (!this.meStoreService.active && this.meStoreService.redirectUrl) {
      this.router.navigate(['/login']);
    }
  }

}

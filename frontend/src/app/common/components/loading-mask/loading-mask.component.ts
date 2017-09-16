import { Component, OnInit, OnChanges, HostBinding, Input } from '@angular/core';
import { ChorusDispatcherService } from "app/common/services";
import { Payload } from "app/common/base";

export interface UpdateStatusEvent {
    name: string;
    show?: boolean;
}

@Component({
  selector: 'cr-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.scss']
})
export class LoadingMaskComponent implements OnInit, OnChanges {

  static EVENT_PREFIX: string = "LoadingMaskComponent.";
  static UPDATE_STATUS_EVENT: string = LoadingMaskComponent.EVENT_PREFIX + "update-status";

  @Input()
  name: string;

  @Input()
  show: boolean = false;

  @Input()
  @HostBinding('style.background-color')
  backgroundColor: string = "#fff";

  @Input()
  loadingColor: string = "#4fa7da";

  @HostBinding('style.display')
  display: string = "none";

  constructor(
    private chorusDispatcherService: ChorusDispatcherService
  ) { }

  ngOnInit() {
    this.setShowStatus();
    this.chorusDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case LoadingMaskComponent.UPDATE_STATUS_EVENT:
            this.updateStatus(<UpdateStatusEvent>payload.data);
            break;
        }
      }
    );
  }

  ngOnChanges() {
    this.setShowStatus();
  }

  private updateStatus(event: UpdateStatusEvent) {
    if (event.name !== this.name) {
      return;
    }

    this.show = event.show;
    this.setShowStatus();
  }

  private setShowStatus() {
    if (this.show) {
      this.display = "block";
    } else {
      this.display = "none";
    }
  }

}

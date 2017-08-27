import { Component, OnInit } from '@angular/core';
import { MeActionService, MeStoreService } from "app/common/services";
import { Payload } from "app/common/base";
import { Router } from "@angular/router";

@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: { userName: string, password: string } = {
    userName: "",
    password: ""
  };

  submitDisabled: boolean = false;

  constructor(
    private router: Router,
    private meActionService: MeActionService,
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
    this.meStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case MeStoreService.LOGIN_SUCCESS_EVENT:
            this.onSuccess();
            break;
          case MeStoreService.LOGIN_FAILED_EVENT:
            this.onFailed();
            break;
        }
      }
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitDisabled = true;
    this.meActionService.login(this.form.userName, this.form.password);
  }

  onSuccess() {
    if (!this.meStoreService.active) {
      this.onFailed();
    }

    if (this.meStoreService.redirectUrl) {
      this.router.navigateByUrl(this.meStoreService.redirectUrl);
      this.meStoreService.redirectUrl = null;
    } else {
      this.router.navigate(["/"]);
    }
  }

  onFailed() {
    this.submitDisabled = false;
  }

}

import { Injectable } from '@angular/core';
import { Client, over, Message } from "stompjs";
import { ActivatedRoute, Params } from "@angular/router";
import { _ } from "app";
import { TextArea } from "app/sheet/element/text-area";
import { SheetDispatcherService } from "app/sheet/services/sheet-dispatcher.service";
import { SheetActionService } from "app/sheet/services/sheet-action.service";
import { SheetStoreService } from "app/sheet/services/sheet-store.service";
import { Sheet } from "app/sheet/sheet";
import { UUID } from "app/common/utils/uuid";

@Injectable()
export class ConcurrentEditService {

  static STOMP_ROOT: string = "/stomp";
  static TOPIC: string = "/topic/concurrent-edit/";
  static USER_TOPIC: string = "/user" + ConcurrentEditService.TOPIC;
  static CONTROL_TOPIC: string = "/topic/concurrent-edit/control/";
  static USER_CONTROL_TOPIC: string = "/user" + ConcurrentEditService.CONTROL_TOPIC;
  static API_ROOT: string = "/api/concurrent-edit/";

  static EVENT_PREFIX: string = ConcurrentEditService.name + ".";
  static EDIT_COMMAND_EVENT: string = ConcurrentEditService.EVENT_PREFIX + "edit-command-event";

  private socket: WebSocket;
  private stompClient: Client;

  private methodHandler: { [methodName: string]: (message: Message) => void };
  private controlMethodHandler: { [methodName: string]: (message: Message) => void };

  private sheetId: string;

  private sheetRequested: boolean = false;

  private editUsers: { [sessionId: string]: EditUser };

  constructor(
    private route: ActivatedRoute,
    private sheetDispatcherService: SheetDispatcherService,
    private sheetActionService: SheetActionService,
    private sheetStoreService: SheetStoreService
  ) {
    this.methodHandler = {
      invokeEditCommand: this.onInvokeEditCommand
    };

    this.controlMethodHandler = {
      updateEditUsers: this.onUpdateEditUsers,
      provideSpreadSheet: this.onProvideSheet,
      requestSpreadSheet: this.onRequestSheet
    };
  }

  start() {
    // this.route.queryParams.subscribe((params: Params) => {
    //   this.sheetId = params["id"];
    //   if (_.isEmpty(this.sheetId)) {
    //     return;
    //   }

    //   this.socket = new WebSocket("ws://localhost:8080" + SharedEditApiService.STOMP_ROOT);
    //   this.stompClient = over(this.socket);
    //   this.stompClient.connect(null, null, () => {
    //     this.join();
    //   });
    // });

    var testSheet: Sheet = new Sheet().init("test sheet");
    var textEl = new TextArea();
    textEl.posX = 200;
    textEl.posY = 100;
    textEl.text = "# TextText\nhoge\n## test";
    var id = UUID.v4();
    testSheet.tabs[testSheet.selectedTabName].elements[id] = textEl;
    testSheet.tabs[testSheet.selectedTabName].elementOrder.push(id);

    testSheet = new Sheet().fromJSON(
      JSON.parse(
        JSON.stringify(testSheet)
      )
    );

    setTimeout(() => {
      this.sheetActionService.setSheet(testSheet);
    }, 500);
  }

  close() {
    // this.stompClient.disconnect(() => {
    //   this.socket.close();
    // });
  }

  sendEditCommand(commandJsonStr: string) {
    if (this.isEditingOnlyMyself()) {
      this.sheetDispatcherService.emit({
        eventType: ConcurrentEditService.EDIT_COMMAND_EVENT,
        data: commandJsonStr
      });
      return;
    }

    this.stompClient.send(ConcurrentEditService.API_ROOT + "send-edit-command/" + this.sheetId, {}, commandJsonStr);
  }

  private isEditingOnlyMyself(): boolean {
    if (!this.editUsers || _.size(this.editUsers) <= 1) {
      return true;
    }
    return false
  }

  private join() {
    this.stompClient.subscribe(ConcurrentEditService.CONTROL_TOPIC + this.sheetId, (message: Message) => {
      var method: (message: Message) => void = this.controlMethodHandler[message.headers["event"]];
      if (method) {
        method.call(this, message);
      }
    });
    this.stompClient.subscribe(ConcurrentEditService.USER_CONTROL_TOPIC + this.sheetId, (message: Message) => {
      var method: (message: Message) => void = this.controlMethodHandler[message.headers["event"]];
      if (method) {
        method.call(this, message);
      }
    });
    this.stompClient.subscribe(ConcurrentEditService.TOPIC + this.sheetId, (message: Message) => {
      var method: (message: Message) => void = this.methodHandler[message.headers["event"]];
      if (method) {
        method.call(this, message);
      }
    });

    this.stompClient.send(ConcurrentEditService.API_ROOT + "join/" + this.sheetId, {}, "{}");
  }

  private onInvokeEditCommand(message: Message) {
    this.sheetDispatcherService.emit({
      eventType: ConcurrentEditService.EDIT_COMMAND_EVENT,
      data: message.body
    });
  }

  private onUpdateEditUsers(message: Message) {
    this.editUsers = JSON.parse(message.body);
    if (!this.sheetRequested) {
      this.sheetRequested = true;
      this.requestSheet();
    }
  }

  private requestSheet() {
    this.stompClient.send(ConcurrentEditService.API_ROOT + "request-sheet/" + this.sheetId, {}, "{}");
  }

  private onProvideSheet(message: Message) {
    var sheet: Sheet = new Sheet().fromJSON(JSON.parse(message.body));
    this.sheetActionService.setSheet(sheet);
  }

  private onRequestSheet(message: Message) {
    var headers: {} = {};
    headers["requestUser"] = message.headers["requestUser"];
    this.stompClient.send(
      ConcurrentEditService.API_ROOT + "provide-sheet/" + this.sheetId,
      headers,
      JSON.stringify(this.sheetStoreService.sheet));
  }

}

export class EditUser {

  sessionId: string;

  userName: string;

}

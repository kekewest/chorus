import { Injectable } from '@angular/core';
import { Client, over, Message } from "stompjs";
import { ActivatedRoute, Params } from "@angular/router";
import { _ } from "app";
import { SpreadSheetActionService, SpreadSheetStoreService, SpreadSheetDispatcherService } from "app/spread-sheet/services";
import { SpreadSheet } from "app/spread-sheet";
import { EditCommand } from "app/spread-sheet/services/command-actions";

@Injectable()
export class SharedEditApiService {

  static WEBSOCKET_ROOT: string = "/ws";
  static TOPIC: string = "/topic/shared-edit/";
  static USER_TOPIC: string = "/user" + SharedEditApiService.TOPIC;
  static CONTROL_TOPIC: string = "/topic/shared-edit/control/";
  static USER_CONTROL_TOPIC: string = "/user" + SharedEditApiService.CONTROL_TOPIC;
  static API_ROOT: string = "/api/shared-edit/";

  static EVENT_PREFIX: string = "SharedEditApiService.";
  static EDIT_COMMAND_EVENT_PREFIX: string = SharedEditApiService.EVENT_PREFIX + "edit-command-event.";

  private nodeId: string;

  private spreadSheetLoaded: boolean = false;

  private socket: WebSocket;

  private stompClient: Client;

  private methodHandler: { [methodName: string]: (message: Message) => void };

  private controlMethodHandler: { [methodName: string]: (message: Message) => void };

  constructor(
    private route: ActivatedRoute,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetActionService: SpreadSheetActionService,
    private SpreadSheetStoreService: SpreadSheetStoreService
  ) {
    this.methodHandler = {
      invokeEditCommand: this.invokeEditCommand
    };

    this.controlMethodHandler = {
      updateEditUsers: this.updateEditUsers,
      provideSpreadSheet: this.provideSpreadSheet,
      requestSpreadSheet: this.requestSpreadSheet
    };
  }

  start() {
    this.route.queryParams.subscribe((params: Params) => {
      this.nodeId = params["id"];
      if (_.isEmpty(this.nodeId)) {
        return;
      }

      this.socket = new WebSocket("ws://localhost:8080" + SharedEditApiService.WEBSOCKET_ROOT);
      this.stompClient = over(this.socket);
      this.stompClient.connect(null, null, () => {
        this.join();
      });
    });
  }

  close() {
    this.stompClient.disconnect(() => {
      this.socket.close();
    });
  }

  sendEditCommand(commandName: string, commandJsonStr: string) {
    var headers: {} = {};
    headers["commandName"] = commandName;
    this.stompClient.send(SharedEditApiService.API_ROOT + "send-edit-command/" + this.nodeId, headers, commandJsonStr);
  }

  private join() {
    this.stompClient.subscribe(SharedEditApiService.CONTROL_TOPIC + this.nodeId, (message: Message) => {
      var method: (message: Message) => void = this.controlMethodHandler[message.headers["event"]];
      if (method) {
        method.call(this, message);
      }
    });
    this.stompClient.subscribe(SharedEditApiService.USER_CONTROL_TOPIC + this.nodeId, (message: Message) => {
      var method: (message: Message) => void = this.controlMethodHandler[message.headers["event"]];
      if (method) {
        method.call(this, message);
      }
    });
    this.stompClient.subscribe(SharedEditApiService.TOPIC + this.nodeId, (message: Message) => {
      var method: (message: Message) => void = this.methodHandler[message.headers["event"]];
      if (method) {
        method.call(this, message);
      }
    });

    this.stompClient.send(SharedEditApiService.API_ROOT + "join/" + this.nodeId, {}, "{}");
  }

  private invokeEditCommand(message: Message) {
    this.spreadSheetDispatcherService.emit({
      eventType: SharedEditApiService.EDIT_COMMAND_EVENT_PREFIX + message.headers["commandName"],
      data: message.body
    });
  }

  private updateEditUsers(message: Message) {
    if (!this.spreadSheetLoaded) {
      this.getSpreadSheet();
      this.spreadSheetLoaded = true;
    }
  }

  private getSpreadSheet() {
    this.stompClient.send(SharedEditApiService.API_ROOT + "request-spreadsheet/" + this.nodeId, {}, "{}");
  }

  private provideSpreadSheet(message: Message) {
    var spreadSheet: SpreadSheet = new SpreadSheet().fromJSON(JSON.parse(message.body));
    this.spreadSheetActionService.setSpreadSheet(spreadSheet);
  }

  private requestSpreadSheet(message: Message) {
    var headers: {} = {};
    headers["requestUser"] = message.headers["requestUser"];
    this.stompClient.send(
      SharedEditApiService.API_ROOT + "provide-spreadsheet/" + this.nodeId,
      headers,
      JSON.stringify(this.SpreadSheetStoreService.getSpreadSheet()));
  }

}

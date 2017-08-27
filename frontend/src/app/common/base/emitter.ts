import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface Payload {
  eventType: string;
  data?: any;
}

export class Emitter<TPayload> {

  private static ID_PREFIX: string = "id_";

  private _emitSubject: Subject<TPayload> = new Subject<TPayload>();
  private _callBacks: { [id: string]: (payload: TPayload) => void } = {};
  private _isEmitting: boolean = false;
  private _isHandled: { [id: string]: boolean } = {};
  private _isPending: { [id: string]: boolean } = {};
  private _lastId: number = 1;
  private _pendingPayload: TPayload;

  constructor() {
    this._emitSubject.asObservable().subscribe(
      (payload: TPayload) => {
        this.invokeEmit(payload);
      }
    );
  }

  register(callback: (payload: TPayload) => void): string {
    var id = Emitter.ID_PREFIX + this._lastId++;
    this._callBacks[id] = callback;
    return id;
  }

  unregister(id: string) {
    delete this._callBacks[id];
    delete this._isHandled[id];
    delete this._isPending[id];
  }

  emit(payload: TPayload) {
    this._emitSubject.next(payload);
  }

  private invokeEmit(payload: TPayload) {
    this.startEmitting(payload);
    try {
      for (var id in this._callBacks) {
        if (this._isPending[id]) {
          continue;
        }
        this.invokeCallBack(id);
      }
    } finally {
      this.stopEmitting();
    }
  }

  waitFor(ids: string[]) {
    if (!this._isEmitting) {
      throw new Error("waitFor(...): Must be invoked while emitting.");
    }

    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      if (this._isPending[id]) {
        continue;
      }
      this.invokeCallBack(id);
    }
  }

  private invokeCallBack(id: string) {
    this._isPending[id] = true;
    this._callBacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  }

  private startEmitting(payload: TPayload) {
    for (var id in this._callBacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isEmitting = true;
  }

  private stopEmitting() {
    delete this._pendingPayload;
    this._isEmitting = false;
  }

}

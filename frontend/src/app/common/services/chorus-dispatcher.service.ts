import { Injectable } from '@angular/core';
import { Payload, Emitter } from "app/common/base/emitter";

@Injectable()
export class ChorusDispatcherService  extends Emitter<Payload> {
}

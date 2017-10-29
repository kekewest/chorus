import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/common/base/emitter";

@Injectable()
export class SheetDispatcherService extends Emitter<Payload> {
}

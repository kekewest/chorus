import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/common/base";

@Injectable()
export class SpreadSheetDispatcherService extends Emitter<Payload> {
}

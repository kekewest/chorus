import { Injectable } from '@angular/core';
import { Emitter, Payload } from 'app/common/base';

@Injectable()
export class SheetViewDispatcherService extends Emitter<Payload> {
}

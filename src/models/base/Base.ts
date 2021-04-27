import { v4 as uuid } from 'uuid';
import { Utils } from '../../configs/Utils';

export abstract class Base {

    id: string = uuid();

    registerDate: Date | string = Utils.formatDatePtBr();
}
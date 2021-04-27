import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';

export class Shopping extends Base {

    userId: string = uuid();

    planId: string = uuid();

    couponId: string = uuid();
    
    amountPaid: number = 0;
    
}

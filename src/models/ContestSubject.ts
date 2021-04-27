import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';

export class ContestSubject extends Base {

    contestId: string = uuid();
    
    subjectId: string = uuid();
}

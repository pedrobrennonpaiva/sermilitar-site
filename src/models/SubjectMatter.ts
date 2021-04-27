import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';
import { Subject } from "./Subject";

export class SubjectMatter extends Base {

    name: string = '';

    subjectId: string = uuid();
    
    subject: Subject | null = null;
}

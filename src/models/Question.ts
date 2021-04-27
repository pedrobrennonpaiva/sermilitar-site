import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';
import { QuestionText } from "./QuestionText";
import { Contest } from "./Contest";
import { Subject } from "./Subject";
import { SubjectMatter } from "./SubjectMatter";
import { Alternative } from "./Alternative";

export class Question extends Base {

    ask: string = '';

    imageUrl: string = '';
    
    questionTextId: string | undefined;
    
    questionText: QuestionText | null = null;
    
    contestId: string = '';
    
    contest: Contest | null = null;
    
    subjectId: string = '';
    
    subject: Subject | null = null;
    
    subjectMatterId: string = '';
    
    subjectMatter: SubjectMatter | null = null;
    
    isCanceled: boolean = false;

    solution: string = '';

    alternatives: Array<Alternative> = new Array<Alternative>();
}

import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';

export class QuestionAnswer extends Base {

    questionId: string = uuid();

    alternativeId: string = uuid();

    userId: string = uuid();
}

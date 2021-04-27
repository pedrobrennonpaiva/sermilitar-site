import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';
import { ArmedForce } from "./ArmedForce";
import { Patent } from "./Patent";
import { Scholarity } from "./Scholarity";

export class Contest extends Base {

    name: string = '';
    
    year: number = 0;

    armedForceId: string = uuid();
    
    armedForce: ArmedForce | null = null;
    
    patentId: string = uuid();
    
    patent: Patent | null = null;

    salary: number | undefined;

    questionsLength: number | undefined;

    questionDescription: string | undefined;

    registration: string | undefined;

    testDate: Date | string | undefined;

    vacancies: number | undefined;

    vacanciesDescription: string | undefined;

    requirements: string | undefined;

    scholarityId: string = uuid();

    scholarity: Scholarity | null = null;

    areas: string | undefined;

    locations: string | undefined;

    duration: string | undefined;

    site: string | undefined;
}

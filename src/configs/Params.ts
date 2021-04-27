import React from 'react';
import { ArmedForce } from '../models/ArmedForce';
import { Contest } from '../models/Contest';
import { Patent } from '../models/Patent';
import { Question } from '../models/Question';
import { QuestionText } from '../models/QuestionText';
import { Scholarity } from '../models/Scholarity';
import { SelectModel } from '../models/SelectModel';
import { Subject } from '../models/Subject';
import { SubjectMatter } from '../models/SubjectMatter';

export interface Params {
    id?: string;
}

export interface AdminScholarityParams {
    scholarity?: Scholarity;
    scholarities?: Array<Scholarity>;
    setScholarities?: React.Dispatch<React.SetStateAction<Array<Scholarity>>>;
}

export interface AdminPatentParams {
    patent?: Patent;
    patents?: Array<Patent>;
    setPatents?: React.Dispatch<React.SetStateAction<Array<Patent>>>;
}

export interface AdminArmedForceParams {
    armedForce?: ArmedForce;
    armedForces?: Array<ArmedForce>;
    setArmedForces?: React.Dispatch<React.SetStateAction<Array<ArmedForce>>>;
}

export interface AdminSubjectParams {
    subject?: Subject;
    subjects?: Array<Subject>;
    setSubjects?: React.Dispatch<React.SetStateAction<Array<Subject>>>;
}

export interface AdminSubjectMatterParams {
    subjectMatter?: SubjectMatter;
    subjectMatters?: Array<SubjectMatter>;
    setSubjectMatters?: React.Dispatch<React.SetStateAction<Array<SubjectMatter>>>;
    optionSubjectSelect: Array<SelectModel>;
}

export interface AdminContestParams {
    contest?: Contest;
    contests?: Array<Contest>;
    setContests?: React.Dispatch<React.SetStateAction<Array<Contest>>>;
    optionArmedForceSelect: Array<SelectModel>;
    optionPatentSelect: Array<SelectModel>;
    optionScholaritySelect: Array<SelectModel>;
}

export interface AdminQuestionTextParams {
    questionText?: QuestionText;
    questionTexts?: Array<QuestionText>;
    setQuestionTexts?: React.Dispatch<React.SetStateAction<Array<QuestionText>>>;
}

export interface AdminQuestionAddParams {
    question: Question;
    questions: Array<Question>;
    setQuestions: React.Dispatch<React.SetStateAction<Array<Question>>>;
    subjects: Array<Subject>;
    contests: Array<Contest>;
    questionTexts: Array<QuestionText>;
}
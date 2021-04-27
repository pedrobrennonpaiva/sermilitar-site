import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminQuestionAddForm from '../components/AdminQuestionAddForm';
import Alert from '../components/Alert';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Validations } from '../configs/Validations';
import { Contest } from '../models/Contest';
import { Question } from '../models/Question';
import { QuestionText } from '../models/QuestionText';
import { Subject } from '../models/Subject';
import styles from '../styles/admin.module.css';

const AdminQuestionAdd = (props: Props) => {
    
    const [btnTxt, setBtnTxt] = useState<string | object>();

    const [questions, setQuestions] = useState(new Array<Question>());
    const [contests, setContests] = useState(new Array<Contest>());
    const [subjects, setSubjects] = useState(new Array<Subject>());
    const [questionTexts, setQuestionTexts] = useState(new Array<QuestionText>());

    const [isLoading, setIsLoading] = useState(true);

    const api = new Api();

    useEffect(() => {

        setBtnTxt('Adicionar');

        const getContest = async () => {

            await api.getContest()
                .then(res => {

                    var models = res as Array<Contest>;
                    setContests(models);
                    
                    const getSubject = async () => {

                        await api.getSubject()
                            .then(res => {
            
                                var models = res as Array<Subject>;
                                setSubjects(models);
                                
                                const getQuestionText = async () => {

                                    await api.getQuestionText()
                                        .then(res => {
                        
                                            var models = res as Array<QuestionText>;
                                            setQuestionTexts(models);
                                            setIsLoading(false);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                                getQuestionText();
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                    getSubject();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getContest();
        
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        if(questions.length <= 0)
        {
            alert('Adicione uma ou mais questões!');
            setBtnTxt('Adicionar');
        }

        var errors = '';

        questions.forEach((question, index) => {

            var nError = Validations.validateRequiredField(question.ask, 'pergunta');
            var cError = Validations.validateRequiredField(question.contestId, 'concurso');
            var sError = Validations.validateRequiredField(question.subjectId, 'matéria');
            var sMError = Validations.validateRequiredField(question.subjectMatterId, 'assunto');
            var aError = question.alternatives.length <= 0 ? 'A pergunta deve conter 1 ou mais alternativas!' : '';

            if(nError || cError || sError || sMError || aError)
            {
                errors += `${errors ? '\n\n' : ''}Questão ${index+1}:\n`;
                errors += nError ? `${nError}` : '';
                errors += cError ? `${cError}` : '';
                errors += sError ? `${sError}` : '';
                errors += sMError ? `${sMError}` : '';
                errors += aError ? `${aError}` : '';
            }
        });

        if(errors !== '')
        {
            alert(errors);
            setBtnTxt('Adicionar');
        }
        else
        {
            var message = '';
            
            for(const question of questions) {
                
                var index = questions.indexOf(question);

                await api.insertQuestion(question)
                .then(res => {

                    var q = res.data.model as Question;

                    question.alternatives.forEach((alt, index) => {
                        alt.questionId = q.id;
                        alt.position = index + 1;
                        api.insertAlternative(alt);
                    });

                    message += `Questão ${index+1} - ${res.data.message}\n`;
                })
                .catch(error => {
                    console.log(error);
                    message += `Questão ${index+1} - ${error.message}\n`;
                });
            }

            alert(message);
            setBtnTxt('Adicionar');
        }
    }

    const handleAddQuestion = () => {

        var newQuestion = new Question();

        if(questions.length > 0)
        {
            var lastQuestion = questions[questions.length - 1];
            newQuestion.alternatives = lastQuestion.alternatives;
            newQuestion.ask = lastQuestion.ask;
            newQuestion.contestId = lastQuestion.contestId;
            newQuestion.isCanceled = lastQuestion.isCanceled;
            newQuestion.questionTextId = lastQuestion.questionTextId;
            newQuestion.solution = lastQuestion.solution;
            newQuestion.subjectId = lastQuestion.subjectId;
            newQuestion.subjectMatterId = lastQuestion.subjectMatterId;
        }
        
        const newQuestions = [...questions, newQuestion];
        setQuestions(newQuestions);
    }

    return (
        <div className={`m-4`}>

            <Alert state={props.location.state} />

            <div className={`text-center`}>
                <h1 className={`${styles.h_title}`}>
                    Adicionar questão
                </h1>
            </div>

            <div className={`mb-4`}>
                <div className={`${styles.div_buttons}`}>
                    <Link
                        className={`${styles.btn_menu}`}
                        to={`/admin/questoes`}
                    >
                        Voltar
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        {isLoading ? 
                            <div className={`text-center`}>
                                <Spinner animation="grow" size="sm" className={`color_primary`} />
                            </div>
                        :
                        questions.map((question, key) => (
                            <AdminQuestionAddForm 
                                key={key}
                                question={question}
                                questions={questions}
                                setQuestions={setQuestions}
                                contests={contests}
                                subjects={subjects}
                                questionTexts={questionTexts}
                            />
                        ))}
                        
                        <div className={`text-center mt-3`}>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => handleAddQuestion()}
                                    className={`${styles.btn_menu} mb-2`}
                                >
                                    Adicionar questão
                                </button>
                            </div>
                            <button type="submit" className={`${styles.btn_add}`}>
                                {btnTxt}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AdminQuestionAdd;
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import AdminQuestionTextTr from '../components/TableRow/AdminQuestionTextTr';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Utils } from '../configs/Utils';
import { Validations } from '../configs/Validations';
import { QuestionText } from '../models/QuestionText';
import styles from '../styles/admin.module.css';

const AdminQuestionText = (props: Props) => {

    const [questionTexts, setQuestionTexts] = useState<Array<QuestionText>>(new Array<QuestionText>());
    const [isLoading, setIsLoading] = useState(true);

    const [text, setText] = useState('');
    const [textError, setTextError] = useState('');
    const [btnTxt, setBtnTxt] = useState<string | object>();

    const api = new Api();

    useEffect(() => {

        setBtnTxt('Adicionar');

        const getQuestionText = async () => {

            await api.getQuestionText()
                .then(res => {

                    var questionText = res as Array<QuestionText>;

                    setQuestionTexts(questionText);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getQuestionText();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(text, 'nome');

        if(nError)
        {
            setTextError(nError);
            setBtnTxt('Adicionar');
        }
        else
        {
            const add = async () => {

                var model = new QuestionText();
                model.text = text;

                await api.insertQuestionText(model)
                    .then(res => {

                        var newModel = res.data.model as QuestionText;
                        questionTexts.push(newModel);
                        setQuestionTexts(questionTexts);

                        setBtnTxt('Adicionar');
                        Utils.alertLocalStorage(res.data.message, true);
                    })
                    .catch(error => {
                        console.log(error);
                        setBtnTxt('Adicionar');
                        Utils.alertLocalStorage(error.message, false);
                    })
            }
            add();
        }
    }

    return (
        <div className={`m-4`}>

            <Alert state={props.location.state} />
            
            <div className={`text-center`}>
                <h1 className={`${styles.h_title}`}>
                    Textos
                </h1>
            </div>

            <div className={`mb-4`}>
                <Accordion>
                    <div className={`${styles.div_buttons}`}>
                        <Accordion.Toggle as={Card.Header} eventKey="1" className={`${styles.btn_menu}`}>
                            Adicionar
                        </Accordion.Toggle>
                        <Link
                            className={`${styles.btn_menu} ml-0 ml-md-2`}
                            to={`/admin/questoes`}
                        >
                            Voltar
                        </Link>
                    </div>
                    <div>
                        <Accordion.Collapse eventKey="1">
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formText">
                                            <Form.Label className={`${styles.form_label}`}>
                                                Texto
                                            </Form.Label>
                                            <Form.Control 
                                                placeholder="Digite o nome" 
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                className={`${styles.form_control}`}
                                                as='textarea'
                                                rows={3}
                                            />
                                            <Form.Text className="text-danger">
                                                {textError}
                                            </Form.Text>
                                        </Form.Group>

                                        <div className={`text-center mt-3`}>
                                            <button type="submit" className={`${styles.btn_add}`}>
                                                {btnTxt}
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
            </div>
            <div>

                {isLoading ?
                    <div className={`text-center`}>
                        <Spinner animation="grow" size="sm" className={`color_primary`} />
                    </div>
                    :
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Texto</th>
                                <th></th>
                            </tr>
                        </thead>
                        {questionTexts.map((s, k) => (
                            <AdminQuestionTextTr 
                                questionTexts={questionTexts}
                                questionText={s}
                                setQuestionTexts={setQuestionTexts}
                                key={k} 
                            />
                        ))}
                    </Table>
                }
            </div>
        </div>
    )
}

export default AdminQuestionText;
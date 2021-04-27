import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Spinner } from 'react-bootstrap';
import Select, { ValueType } from 'react-select';
import Alert from '../components/Alert';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Utils } from '../configs/Utils';
import { Validations } from '../configs/Validations';
import { Alternative } from '../models/Alternative';
import { Question } from '../models/Question';
import { SelectModel } from '../models/SelectModel';
import styles from '../styles/admin.module.css';

const AdminAlternative = (props: Props) => {

    const [questionSelect, setQuestionSelect] = useState<SelectModel | null>();
    const [optionQuestionSelect, setOptionQuestionSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    
    const [isCorrect, setIsCorrect] = useState(false);
    const [position, setPosition] = useState(0);
    
    const [text, setText] = useState('');
    const [textError, setTextError] = useState('');

    const [btnTxt, setBtnTxt] = useState<string | object>();

    const api = new Api();

    useEffect(() => {

        setBtnTxt('Adicionar');

        const getQuestion = async () => {

            await api.getQuestion()
            .then(res => {

                var models = res as Array<Question>;

                var opSelect = new Array<SelectModel>();

                models.forEach(g => {
                    var cSel = new SelectModel();
                    cSel.label = g.ask;
                    cSel.value = g.id;
                    opSelect.push(cSel);
                });

                setOptionQuestionSelect(opSelect);
            });
        }
        getQuestion();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(text, 'texto');

        if(nError)
        {
            setTextError(nError);
            setBtnTxt('Adicionar');
        }
        else
        {
            const add = async () => {

                var model = new Alternative();
                model.questionId = questionSelect?.value!;
                model.text = text;
                model.position = position;
                model.isCorrect = isCorrect;

                await api.insertAlternative(model)
                    .then(res => {

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
                    Alternativas
                </h1>
            </div>

            <div className={`mb-4`}>
                <Accordion>
                    <div className={`${styles.div_buttons}`}>
                        <Accordion.Toggle as={Card.Header} eventKey="1" className={`${styles.btn_menu}`}>
                            Adicionar
                        </Accordion.Toggle>
                    </div>
                    <div>
                        <Accordion.Collapse eventKey="1">
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formName">
                                            <Form.Label className={`${styles.form_label}`}>
                                                Questão
                                            </Form.Label>
                                            <Select 
                                                value={questionSelect} 
                                                onChange={(e: ValueType<SelectModel, false>) => setQuestionSelect(e)}
                                                options={optionQuestionSelect} 
                                                placeholder='Selecione a questão' 
                                                menuPlacement='bottom'
                                                menuPosition='fixed'
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formName">
                                            <Form.Label className={`${styles.form_label}`}>
                                                Texto
                                            </Form.Label>
                                            <Form.Control 
                                                placeholder="Digite o texto" 
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                className={`${styles.form_control}`}
                                                as='textarea'
                                                cols={4}
                                            />
                                            <Form.Text className="text-danger">
                                                {textError}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formName">
                                            <Form.Label className={`${styles.form_label}`}>
                                                Posição
                                            </Form.Label>
                                            <Form.Control 
                                                type='number'
                                                placeholder="Digite a posição" 
                                                value={position}
                                                onChange={(e) => setPosition(+e.target.value)}
                                                className={`${styles.form_control}`}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formName">
                                            <label>
                                                <input 
                                                    type="checkbox"
                                                    defaultChecked={isCorrect}
                                                    onChange={() => setIsCorrect(!isCorrect)}
                                                /> Alternativa correta
                                            </label>
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
            </div>
        </div>
    )
}

export default AdminAlternative;
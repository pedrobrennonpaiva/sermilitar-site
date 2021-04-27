import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Api } from '../configs/Api';
import { Utils } from '../configs/Utils';
import { Validations } from '../configs/Validations';
import { Question } from '../models/Question';
import styles from '../styles/admin.module.css';

const AdminQuestionUpdate = () => {

    const [ask, setAsk] = useState('');
    const [askError, setAskError] = useState('');

    const [btnTxt, setBtnTxt] = useState<string | object>();

    const api = new Api();
    const history = useHistory();

    useEffect(() => {


    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(ask, 'pergunta');

        if(nError)
        {
            setAskError(nError);
            setBtnTxt('Adicionar');
        }
        else
        {
            const add = async () => {

                var model = new Question();
                model.ask = ask;

                await api.insertQuestion(model)
                    .then(res => {

                        setBtnTxt('Adicionar');
                        Utils.alertLocalStorage(res.data.message, true);
                        history.push('/admin/questoes');
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

            <div className={`text-center`}>
                <h1 className={`${styles.h_title}`}>
                    Atualizar questão
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
                <div className={`row`}>
                    <div className={`col-md-6`}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label className={`${styles.form_label}`}>
                                    Nome
                                </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Digite o nome" 
                                    value={ask}
                                    onChange={(e) => setAsk(e.target.value)}
                                    className={`${styles.form_control}`}
                                />
                                <Form.Text className="text-danger">
                                    {askError}
                                </Form.Text>
                            </Form.Group>

                            <div className={`text-center mt-3`}>
                                <button type="submit" className={`${styles.btn_add}`}>
                                    {btnTxt}
                                </button>
                            </div>
                        </Form>
                    </div>
                    <div className={`col-md-6`}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminQuestionUpdate;
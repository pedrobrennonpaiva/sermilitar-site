import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { Api } from "../../configs/Api";
import { AdminQuestionTextParams } from "../../configs/Params";
import { Validations } from "../../configs/Validations";
import { QuestionText } from "../../models/QuestionText";
import styles from '../../styles/admin.module.css';

const AdminQuestionTextTr = ({ questionText, questionTexts, setQuestionTexts } : AdminQuestionTextParams) => {

    const [displayTr, setDisplayTr] = useState('none');

    const [text, setText] = useState('');
    const [textError, setTextError] = useState('');

    const [btnTxt, setBtnTxt] = useState<string | object>();
    const [btnDisable, setBtnDisable] = useState(false);

    const [btnTxtDelete, setBtnTxtDelete] = useState<string | object>();
    const [btnDeleteDisable, setBtnDeleteDisable] = useState(false);

    const api = new Api();
    
    useEffect(() => {

        setBtnTxt('Atualizar');
        setBtnTxtDelete('Excluir');
        setText(questionText?.text!);
    }, []);

    const handleOpenUpdate = () => {
        setDisplayTr(displayTr === 'none' ? 'table-row' : 'none');
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnDisable(true);
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(text, 'nome');

        if(nError)
        {
            setTextError(nError);
            setBtnTxt('Atualizar');
        }
        else
        {
            const update = async () => {

                var model = new QuestionText();
                model.id = questionText?.id!;
                model.text = text;

                await api.updateQuestionText(model)
                    .then(res => {

                        var newModel = res.data.model as QuestionText;
                        
                        const newSch = questionTexts?.map((s) => {

                            if(s.id === newModel.id)
                            {
                                const update = {
                                    ...s,
                                    text: newModel.text
                                }
                                return update;
                            }
                            return s;
                        });

                        setQuestionTexts!(newSch!);
                        setBtnDisable(false);
                        setBtnTxt('Atualizar');
                        alert(res.data.message);
                    })
                    .catch(error => {
                        console.log(error);
                        setBtnDisable(false);
                        setBtnTxt('Atualizar');
                        alert(error.message);
                    })
            }
            update();
        }
    }

    const handleDelete = async () => {

        if(window.confirm(`Tem certeza que deseja excluir o texto?`))
        {
            setBtnDeleteDisable(true);
            setBtnTxtDelete(<Spinner animation="grow" variant="light" size="sm" />);

            await api.deleteQuestionText(questionText?.id!)
                .then(res => {

                    var newSch = questionTexts?.filter((s) => s !== questionText);
                    setQuestionTexts!(newSch!);
                    alert(res.data.message);
                })
                .catch(err => {
                    console.log(err);
                    setBtnDeleteDisable(false);
                    setBtnTxtDelete('Excluir');
                    alert(err.message);
                });
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    {questionText?.text}
                </td>
                <td className={`${styles.td_buttons}`}>
                    <button 
                        className={`${styles.btn_table_primary}`}
                        onClick={handleOpenUpdate}
                    >
                        {btnTxt}
                    </button>
                    <button 
                        className={`${styles.btn_table_secondary} ml-2`}
                        onClick={handleDelete}
                        disabled={btnDeleteDisable}
                    >
                        {btnTxtDelete}
                    </button>
                </td>
            </tr>
            <tr style={{ display: displayTr }}>
                <td colSpan={100}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate}>
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
                                    <button type="submit" className={`${styles.btn_add}`} disabled={btnDisable}>
                                        {btnTxt}
                                    </button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </td>
            </tr>
        </tbody>
    )
}

export default AdminQuestionTextTr;

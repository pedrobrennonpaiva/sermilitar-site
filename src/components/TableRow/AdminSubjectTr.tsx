import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { Api } from "../../configs/Api";
import { AdminSubjectParams } from "../../configs/Params";
import { Validations } from "../../configs/Validations";
import { Subject } from "../../models/Subject";
import styles from '../../styles/admin.module.css';

const AdminSubjectTr = ({ subject, subjects, setSubjects } : AdminSubjectParams) => {

    const [displayTr, setDisplayTr] = useState('none');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [btnTxt, setBtnTxt] = useState<string | object>();
    const [btnDisable, setBtnDisable] = useState(false);

    const [btnTxtDelete, setBtnTxtDelete] = useState<string | object>();
    const [btnDeleteDisable, setBtnDeleteDisable] = useState(false);

    const api = new Api();
    
    useEffect(() => {

        setBtnTxt('Atualizar');
        setBtnTxtDelete('Excluir');
        setName(subject?.name!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenUpdate = () => {
        setDisplayTr(displayTr === 'none' ? 'table-row' : 'none');
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnDisable(true);
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(name, 'nome');

        if(nError)
        {
            setNameError(nError);
            setBtnTxt('Atualizar');
        }
        else
        {
            const update = async () => {

                var model = new Subject();
                model.id = subject?.id!;
                model.name = name;

                await api.updateSubject(model)
                    .then(res => {

                        var newModel = res.data.model as Subject;
                        
                        const newSch = subjects?.map((s) => {

                            if(s.id === newModel.id)
                            {
                                const update = {
                                    ...s,
                                    name: newModel.name
                                }
                                return update;
                            }
                            return s;
                        });

                        setSubjects!(newSch!);
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

        if(window.confirm(`Tem certeza que deseja excluir a matéria?`))
        {
            setBtnDeleteDisable(true);
            setBtnTxtDelete(<Spinner animation="grow" variant="light" size="sm" />);

            await api.deleteSubject(subject?.id!)
                .then(res => {

                    var newSch = subjects?.filter((s) => s !== subject);
                    setSubjects!(newSch!);
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
                    {subject?.name}
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
                                <Form.Group controlId="formName">
                                    <Form.Label className={`${styles.form_label}`}>
                                        Nome
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Digite o nome" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`${styles.form_control}`}
                                    />
                                    <Form.Text className="text-danger">
                                        {nameError}
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

export default AdminSubjectTr;

import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import Select, { ValueType } from 'react-select';
import { Api } from "../../configs/Api";
import { AdminSubjectMatterParams } from "../../configs/Params";
import { Validations } from "../../configs/Validations";
import { SelectModel } from '../../models/SelectModel';
import { Subject } from "../../models/Subject";
import { SubjectMatter } from "../../models/SubjectMatter";
import styles from '../../styles/admin.module.css';

const AdminSubjectMatterTr = ({ subjectMatter, subjectMatters, setSubjectMatters, optionSubjectSelect } : AdminSubjectMatterParams) => {

    const [displayTr, setDisplayTr] = useState('none');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [subjectSelect, setSubjectSelect] = useState<SelectModel | null>();
    const [subjectError, setSubjectError] = useState('');

    const [btnTxt, setBtnTxt] = useState<string | object>();
    const [btnDisable, setBtnDisable] = useState(false);

    const [btnTxtDelete, setBtnTxtDelete] = useState<string | object>();
    const [btnDeleteDisable, setBtnDeleteDisable] = useState(false);

    const api = new Api();
    
    useEffect(() => {

        setBtnTxt('Atualizar');
        setBtnTxtDelete('Excluir');
        setName(subjectMatter?.name!);
        setSubjectSelect(optionSubjectSelect.find(x => x.value === subjectMatter?.subjectId));
    }, []);

    const handleOpenUpdate = () => {
        setDisplayTr(displayTr === 'none' ? 'table-row' : 'none');
    }

    const handleSubjectSelect = (event: ValueType<SelectModel, false>) => setSubjectSelect(event);

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnDisable(true);
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(name, 'nome');
        var sError = Validations.validateRequiredField(subjectSelect?.value, 'matéria');

        if(nError || sError)
        {
            setNameError(nError);
            setSubjectError(sError);
            setBtnTxt('Atualizar');
        }
        else
        {
            const update = async () => {

                var model = new SubjectMatter();
                model.id = subjectMatter?.id!;
                model.name = name;
                model.subjectId = subjectSelect?.value!;

                await api.updateSubjectMatter(model)
                    .then(res => {

                        var newModel = res.data.model as SubjectMatter;
                        
                        const newSch = subjectMatters?.map((s) => {

                            if(s.id === newModel.id)
                            {
                                var subject = new Subject();
                                subject.id = newModel.subjectId;
                                subject.name = subjectSelect?.label!;

                                const update = {
                                    ...s,
                                    name: newModel.name,
                                    subjectId: newModel.subjectId,
                                    subject: subject,
                                }
                                return update;
                            }
                            return s;
                        });

                        setSubjectMatters!(newSch!);
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

            await api.deleteSubjectMatter(subjectMatter?.id!)
                .then(res => {

                    var newSch = subjectMatters?.filter((s) => s !== subjectMatter);
                    setSubjectMatters!(newSch!);
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
                    {subjectMatter?.name}
                </td>
                <td>
                    {subjectMatter?.subject?.name}
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

                                <Form.Group>
                                    <Form.Label>Selecione a matéria:</Form.Label>
                                    <Select 
                                        value={subjectSelect} 
                                        onChange={(e: ValueType<SelectModel, false>) => handleSubjectSelect(e)}
                                        options={optionSubjectSelect} 
                                        placeholder='Selecione a matéria' 
                                        menuPlacement='bottom'
                                        menuPosition='fixed'
                                    />
                                    <Form.Text className="text-danger">
                                        {subjectError}
                                    </Form.Text>
                                </Form.Group>

                                <div className={`text-center mt-3`}>
                                    <button 
                                        type="submit" 
                                        className={`${styles.btn_add}`}
                                        disabled={btnDisable}
                                    >
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

export default AdminSubjectMatterTr;

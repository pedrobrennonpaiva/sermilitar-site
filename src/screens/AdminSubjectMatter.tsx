import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select, { ValueType } from 'react-select';
import Alert from '../components/Alert';
import AdminSubjectMatterTr from '../components/TableRow/AdminSubjectMatterTr';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Utils } from '../configs/Utils';
import { Validations } from '../configs/Validations';
import { SelectModel } from '../models/SelectModel';
import { Subject } from '../models/Subject';
import { SubjectMatter } from '../models/SubjectMatter';
import styles from '../styles/admin.module.css';

const AdminSubjectMatter = (props: Props) => {

    const [subjectMatters, setSubjectMatters] = useState<Array<SubjectMatter>>(new Array<SubjectMatter>());
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    
    const [subjectSelect, setSubjectSelect] = useState<SelectModel | null>();
    const [optionSubjectSelect, setOptionSubjectSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    const [subjectError, setSubjectError] = useState('');

    const [btnTxt, setBtnTxt] = useState<string | object>();

    const api = new Api();

    useEffect(() => {

        setBtnTxt('Adicionar');

        const getSubjectMatter = async () => {

            await api.getSubjectMatter()
                .then(res => {

                    var subjectMatter = res as Array<SubjectMatter>;

                    setSubjectMatters(subjectMatter);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getSubjectMatter();

        const getSubject = async () => {

            await api.getSubject()
                .then(res => {

                    var subjects = res as Array<Subject>;

                    var opSelect = new Array<SelectModel>();

                    subjects.forEach(g => {
                        var cSel = new SelectModel();
                        cSel.label = g.name;
                        cSel.value = g.id;
                        opSelect.push(cSel);
                    });

                    setOptionSubjectSelect(opSelect);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getSubject();
        
    }, []);

    const handleSubjectSelect = (event: ValueType<SelectModel, false>) => setSubjectSelect(event);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(name, 'nome');
        var sError = Validations.validateRequiredField(subjectSelect?.value, 'matéria');

        if(nError || sError)
        {
            setNameError(nError);
            setSubjectError(sError);
            setBtnTxt('Adicionar');
        }
        else
        {
            const add = async () => {

                var model = new SubjectMatter();
                model.name = name;
                model.subjectId = subjectSelect?.value!;

                await api.insertSubjectMatter(model)
                    .then(res => {

                        var newModel = res.data.model as SubjectMatter;
                        subjectMatters.push(newModel);
                        setSubjectMatters(subjectMatters);

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
                    Assuntos
                </h1>
            </div>

            <div className={`mb-4`}>
                <Accordion>
                    <div className={`${styles.div_buttons}`}>
                        <Link to='/admin/materias' className={`${styles.btn_menu}`}>
                            Voltar
                        </Link>
                        <Accordion.Toggle as={Card.Header} eventKey="1" className={`${styles.btn_menu} ml-2`}>
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
                                <th>Nome</th>
                                <th>Matéria</th>
                                <th></th>
                            </tr>
                        </thead>
                        {subjectMatters.map((s, k) => (
                            <AdminSubjectMatterTr 
                                subjectMatters={subjectMatters}
                                subjectMatter={s}
                                setSubjectMatters={setSubjectMatters}
                                optionSubjectSelect={optionSubjectSelect}
                                key={k} 
                            />
                        ))}
                    </Table>
                }
            </div>
        </div>
    )
}

export default AdminSubjectMatter;
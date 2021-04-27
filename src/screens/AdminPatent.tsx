import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Spinner, Table } from 'react-bootstrap';
import Alert from '../components/Alert';
import AdminPatentTr from '../components/TableRow/AdminPatentTr';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Utils } from '../configs/Utils';
import { Validations } from '../configs/Validations';
import { Patent } from '../models/Patent';
import styles from '../styles/admin.module.css';

const AdminPatent = (props: Props) => {

    const [patents, setPatents] = useState<Array<Patent>>(new Array<Patent>());
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [btnTxt, setBtnTxt] = useState<string | object>();

    const api = new Api();

    useEffect(() => {

        setBtnTxt('Adicionar');

        const getPatent = async () => {

            await api.getPatent()
                .then(res => {

                    var patent = res as Array<Patent>;

                    setPatents(patent);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getPatent();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(name, 'nome');

        if(nError)
        {
            setNameError(nError);
            setBtnTxt('Adicionar');
        }
        else
        {
            const add = async () => {

                var model = new Patent();
                model.name = name;

                await api.insertPatent(model)
                    .then(res => {

                        var newModel = res.data.model as Patent;
                        patents.push(newModel);
                        setPatents(patents);

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
                    Patentes
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
                                <th></th>
                            </tr>
                        </thead>
                        {patents.map((s, k) => (
                            <AdminPatentTr 
                                patents={patents}
                                patent={s}
                                setPatents={setPatents}
                                key={k} 
                            />
                        ))}
                    </Table>
                }
            </div>
        </div>
    )
}

export default AdminPatent;
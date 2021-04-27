import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Utils } from '../configs/Utils';
import { Question } from '../models/Question';
import styles from '../styles/admin.module.css';

const AdminQuestion = (props: Props) => {

    const [questions, setQuestions] = useState<Array<Question>>(new Array<Question>());
    const [isLoading, setIsLoading] = useState(true);

    const [btnTxtDelete, setBtnTxtDelete] = useState<string | object>();
    const [btnDeleteDisable, setBtnDeleteDisable] = useState(false);

    const api = new Api();

    useEffect(() => {

        setBtnTxtDelete('Excluir');

        const getQuestion = async () => {

            await api.getQuestion()
                .then(res => {

                    var patent = res as Array<Question>;

                    setQuestions(patent);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getQuestion();
    }, []);

    const handleDelete = async (id: string) => {

        if(window.confirm(`Tem certeza que deseja excluir a força armada?`))
        {
            setBtnDeleteDisable(true);
            setBtnTxtDelete(<Spinner animation="grow" variant="light" size="sm" />);

            await api.deleteQuestion(id)
                .then(res => {

                    var newSch = questions?.filter((s) => s.id !== id);
                    setQuestions!(newSch!);
                    Utils.alertLocalStorage(res.data.message, true);
                })
                .catch(err => {
                    console.log(err);
                    setBtnDeleteDisable(false);
                    setBtnTxtDelete('Excluir');
                    Utils.alertLocalStorage(err.message, false);
                });
        }
    }

    return (
        <div className={`m-4`}>

            <Alert state={props.location.state} />
            
            <div className={`text-center`}>
                <h1 className={`${styles.h_title}`}>
                    Questões
                </h1>
            </div>

            <div className={`mb-4`}>
                    <div className={`${styles.div_buttons}`}>
                        <Link
                            className={`${styles.btn_menu}`}
                            to={`/admin/questoes/inserir`}
                        >
                            Adicionar
                        </Link>
                        <Link
                            className={`${styles.btn_menu} ml-0 ml-md-2`}
                            to={`/admin/questoes/textos`}
                        >
                            Textos
                        </Link>
                    </div>
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
                                <th>Pergunta</th>
                                <th>Matéria</th>
                                <th>Concurso</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((s, k) => (
                                <tr key={k}>
                                    <td>
                                        {s.ask}
                                    </td>
                                    <td>
                                        {s.subject?.name}
                                    </td>
                                    <td>
                                        {s.contest?.name + ' - ' + s.contest?.year}
                                    </td>
                                    <td>
                                        <Link
                                            className={`${styles.btn_table_primary}`}
                                            to={`/admin/questoes/editar/${s.id}`}
                                        >
                                            Atualizar
                                        </Link>
                                        <button 
                                            className={`${styles.btn_table_secondary} ml-2`}
                                            onClick={() => handleDelete(s.id)}
                                            disabled={btnDeleteDisable}
                                        >
                                            {btnTxtDelete}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
            </div>
        </div>
    )
}

export default AdminQuestion;
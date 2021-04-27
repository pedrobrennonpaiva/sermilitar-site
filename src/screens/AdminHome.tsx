import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDollarSign, faGraduationCap, faLocationArrow, faMedal, faPen, faSchool, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Alert from "../components/Alert";
import { Props } from "../configs/Props";
import { Session } from "../configs/Session";
import { Utils } from "../configs/Utils";
import styles from '../styles/adminHome.module.css';

const AdminHome = (props: Props) => {

    const history = useHistory();
    
    useEffect(() => {

        if(!Session.isAuthenticatedAdmin())
        {
            Utils.alertLocalStorage('Usuário não logado!', false);
            history.push('/admin/login');
        }
    }, []);

    const handleCardMenu = (url: string) => history.push(url);

    return (
        <div className={`${styles.div_home}`}>

            <Alert state={props.location.state} />

            <div className={`text-center`}>
                <h1 className={`${styles.h_home}`}>
                    PAINEL ADMIN
                </h1>
            </div>

            <div className={`row ${styles.div_row_menu}`}>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/questoes')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faPen} className={`${styles.icon_menu}`} />

                            <h6 className={`mt-3`}>
                                Questões
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/concursos')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faGraduationCap} className={`${styles.icon_menu}`} />
                            <h6 className={`mt-3`}>
                                Concursos
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/planos')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faShoppingCart} className={`${styles.icon_menu}`} />
                            <h6 className={`mt-3`}>
                                Planos
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className={`row ${styles.div_row_menu}`}>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/usuarios')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faUser} className={`${styles.icon_menu}`} />

                            <h6 className={`mt-3`}>
                                Usuários
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/compras')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faDollarSign} className={`${styles.icon_menu}`} />
                            <h6 className={`mt-3`}>
                                Compras
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/materias')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faBook} className={`${styles.icon_menu}`} />
                            <h6 className={`mt-3`}>
                                Matérias
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className={`row ${styles.div_row_menu}`}>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/forcas')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faLocationArrow} className={`${styles.icon_menu}`} />

                            <h6 className={`mt-3`}>
                                Forças Armadas
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/patentes')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faMedal} className={`${styles.icon_menu}`} />
                            <h6 className={`mt-3`}>
                                Patentes
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
                <div className={`col-md-4 d-flex justify-content-center`}>
                    <Card className={`${styles.card_menu}`} onClick={() => handleCardMenu('/admin/escolaridades')}>
                        <Card.Body className={`${styles.card_body_menu}`}>
                            <FontAwesomeIcon icon={faSchool} className={`${styles.icon_menu}`} />
                            <h6 className={`mt-3`}>
                                Escolaridades
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AdminHome;
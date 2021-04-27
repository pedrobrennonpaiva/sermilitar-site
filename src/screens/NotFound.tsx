import React from 'react';
import { Card } from 'react-bootstrap';
import logo from '../images/logo.png';
import styles from '../styles/notFound.module.css';

const NotFound = () => {

    return (
        <div className={`${styles.div_full}`}>

            <Card body className={`${styles.card_login}`}>
                <div className={`${styles.div_img_logo} mb-3`}>
                    <img src={logo} className={`${styles.img_logo} img-fluid center`} alt='logo' />
                </div>

                <div className={`text-center`}>
                    <h2 className={`${styles.h_registration}`}>Página não encontrada!</h2>
                </div>
            </Card>
        </div>
    )
}

export default NotFound;

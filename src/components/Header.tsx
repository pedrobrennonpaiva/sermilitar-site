import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/header.module.css';
import logo from '../images/logo.png';

const Header = () => {

    return (
        <Navbar className={`${styles.header}`} expand='md' collapseOnSelect>
            <Navbar.Brand as={Link} to='/' className={`${styles.navbar_brand}`}>
                <img 
                    className={`${styles.img_logo} img-fluid`} 
                    src={logo}
                    alt='Logo'
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-nav" className={`${styles.nav_toggle}`} />

            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" className={`${styles.nav_link}`}>Início</Nav.Link>
                    <Nav.Link as={Link} to="/questoes" className={`${styles.nav_link}`}>Questões</Nav.Link>
                    <Nav.Link as={Link} to="/planos" className={`${styles.nav_link}`}>Planos</Nav.Link>
                    <Nav.Link as={Link} to="/contato" className={`${styles.nav_link}`}>Contato</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/perfil" className={`${styles.nav_link}`}>
                        <FontAwesomeIcon icon={faUser} className={`${styles.nav_icon}`} />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
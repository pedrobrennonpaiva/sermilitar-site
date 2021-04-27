import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import Alert from "../components/Alert";
import { Api } from "../configs/Api";
import { Props } from "../configs/Props";
import { Session } from "../configs/Session";
import { Utils } from "../configs/Utils";
import { Validations } from "../configs/Validations";
import { AdminAuthenticate } from "../models/Admin";
import { AuthenticateModel } from "../models/Authenticate";
import logo from '../images/logo.png';
import styles from '../styles/adminLogin.module.css';

const AdminLogin = (props: Props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [inputPassword, setInputPassword] = useState('password');
    const [btnTxt, setBtnTxt] = useState<string | object>();
    
    const api = new Api();
    const history = useHistory();

    useEffect(() => {

        if(Session.isAuthenticatedAdmin())
        {
            history.push('/admin');  
        }

        setBtnTxt("Entrar");
    }, []);

    const changeInputPassword = () => setInputPassword(inputPassword === 'password' ? 'text' : 'password');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var uError = Validations.validateUsername(username);
        var pError = Validations.validatePassword(password);

        if(uError || pError)
        {
            setUsernameError(uError);
            setPasswordError(pError);
            setBtnTxt("Entrar");
        }
        else
        {
            const login = async () => {

                var user = new AuthenticateModel();
                user.username = username;
                user.password = password;

                await api.authenticateAdmin(user)
                    .then(res => {
                        var userLogged = res.data as AdminAuthenticate;
                        console.log(userLogged);
                        Session.loginAdmin(userLogged.token, userLogged);
                        Utils.alertLocalStorage('Usuário logado com sucesso!', true);
                        history.push('/admin');
                    })
                    .catch(error => {
                        console.log(error);
                        setBtnTxt("Entrar");
                        Utils.alertLocalStorage("Usuário ou senha inválidos", false);
                    })
            }
            login();
        }
    }

    return (
        <div className={`${styles.div_full}`}>

            <Alert state={props.location.state} />

            <Card body className={`${styles.card_login}`}>
                <div className={`${styles.div_img_logo} mb-3`}>
                    <img src={logo} className={`${styles.img_logo} img-fluid center`} alt='logo' />
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmailLogin">
                        <Form.Label className={`${styles.form_label_login}`}>
                            E-mail
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite seu e-mail ou username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`${styles.form_control_login}`}
                        />
                        <Form.Text className="text-danger">
                            {usernameError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className={`${styles.form_label_login}`}>
                            Senha
                        </Form.Label>
                        <Form.Control 
                            type={inputPassword} 
                            placeholder="Digite sua senha" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${styles.form_control_login}`}
                        />
                        <Form.Text className="text-danger">
                            {passwordError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formCheckbox" className={`d-flex align-items-start`}>
                        <Form.Check type="checkbox" label="Mostrar senha" onClick={changeInputPassword} />
                    </Form.Group>

                    <div className={`text-center mt-3`}>
                        <button type="submit" className={`${styles.btn_login}`}>
                            {btnTxt}
                        </button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default AdminLogin;
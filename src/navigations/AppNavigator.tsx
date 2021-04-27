import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import { Session } from '../configs/Session';
import '../styles/app.css';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../screens/NotFound';
import AdminLogin from '../screens/AdminLogin';
import AdminHome from '../screens/AdminHome';
import HeaderAdmin from '../components/HeaderAdmin';
import AdminScholarity from '../screens/AdminScholarity';
import AdminArmedForce from '../screens/AdminArmedForce';
import AdminSubject from '../screens/AdminSubject';
import AdminSubjectMatter from '../screens/AdminSubjectMatter';
import AdminPatent from '../screens/AdminPatent';
import AdminContest from '../screens/AdminContest';
import AdminQuestion from '../screens/AdminQuestion';
import AdminQuestionAdd from '../screens/AdminQuestionAdd';
import AdminQuestionUpdate from '../screens/AdminQuestionUpdate';
import AdminQuestionText from '../screens/AdminQuestionText';
import AdminAlternative from '../screens/AdminAlternative';

const PrivateRoute = ({ component: Component, ...rest } : any) => (
    <Route
      {...rest}
      render={props =>
        Session.isAuthenticated() ? 
        (
            <div className={`div-root`}>
                <Header />

                <Component {...props} />

                <Footer />
            </div>
        ) : 
        (
            <Redirect 
                to={{ pathname: "/login" }} 
                {...props} 
            />
        )
      }
    />
);

const PrivateRouteAdmin = ({ component: Component, ...rest } : any) => (
    <Route
      {...rest}
      render={props =>
        Session.isAuthenticatedAdmin() ? 
        (
            <div className={`div-root`}>
                <HeaderAdmin />

                <Component {...props} />

                <Footer />
            </div>
        ) : 
        (
            <Redirect 
                to={{ pathname: "/admin/login" }} 
                {...props} 
            />
        )
      }
    />
);

// const PrivateRouteComponent = ({ component: Component, ...rest } : any) => (
//     <Route
//       {...rest}
//       render={props =>
//         Session.isAuthenticated() ? 
//         (
//             <Component {...props} />
//         ) : 
//         (
//             <Redirect 
//                 to={{ pathname: "/login" }} 
//                 {...props} 
//             />
//         )
//       }
//     />
// );

const AppNavigator = () => {
    return (
        <Router>
            <div>
                <Switch>
                    {/* User */}
                    <Route path={["/login"]}
                        render={(props) => 
                            <Login {...props} />
                        }
                    />
                    <PrivateRoute exact path={["/"]} component={Home} />
                    {/* <PrivateRoute exact path={["/cadastros/exportar/:id?"]} component={Exports} /> */}

                    {/* Admin */}
                    <Route exact path={["/admin/login"]}
                        render={(props) => 
                            <AdminLogin {...props} />
                        }
                    />
                    <PrivateRouteAdmin exact path={["/admin"]} component={AdminHome} />
                    <PrivateRouteAdmin exact path={["/admin/questoes"]} component={AdminQuestion} />
                    <PrivateRouteAdmin exact path={["/admin/questoes/inserir"]} component={AdminQuestionAdd} />
                    <PrivateRouteAdmin exact path={["/admin/questoes/editar/:id"]} component={AdminQuestionUpdate} />
                    <PrivateRouteAdmin exact path={["/admin/questoes/textos"]} component={AdminQuestionText} />
                    <PrivateRouteAdmin exact path={["/admin/questoes/alternativas"]} component={AdminAlternative} />
                    <PrivateRouteAdmin exact path={["/admin/concursos"]} component={AdminContest} />
                    <PrivateRouteAdmin exact path={["/admin/planos"]} component={AdminScholarity} />
                    <PrivateRouteAdmin exact path={["/admin/usuarios"]} component={AdminScholarity} />
                    <PrivateRouteAdmin exact path={["/admin/compras"]} component={AdminScholarity} />
                    <PrivateRouteAdmin exact path={["/admin/materias"]} component={AdminSubject} />
                    <PrivateRouteAdmin exact path={["/admin/assuntos"]} component={AdminSubjectMatter} />
                    <PrivateRouteAdmin exact path={["/admin/forcas"]} component={AdminArmedForce} />
                    <PrivateRouteAdmin exact path={["/admin/patentes"]} component={AdminPatent} />
                    <PrivateRouteAdmin exact path={["/admin/escolaridades"]} component={AdminScholarity} />

                    {/* Default */}
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default AppNavigator;

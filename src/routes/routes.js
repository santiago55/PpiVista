import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Ingresos from '../pages/Ingresos'
import Layout from '../pages/Layout';
import EditarIngresos from '../pages/EditarIngreso'
import EditarEgresos from '../pages/EditarEgreso'
import AgregarIngreso from '../pages/AgregarIngreso'
import AgregarEgreso from '../pages/AgregarEgresos'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Egresos from '../pages/Egresos'
import Ahorros from '../pages/Ahorros'
import CrearUsuario from '../pages/CrearUsuario'
import GraficaIngresos from '../pages/GraficaIngresos'
import GraficaEgresos from '../pages/GraficaEgresos'
import AgregarAhorro from '../pages/AgregarAhorro'
import OlvideContraseña from '../pages/OlvideContraseña';
import OlvideContraseñaCamb from '../pages/OlvideContraseCamb';
import CambiarContra from '../pages/CambiarContra';
import '../css/login.css';
function Routes() {
    const cookies = new Cookies();
    const [ingresos, guardarIngresos] = useState([]);
    const [egresos, guardarEgresos] = useState([]);
    const [ahorros, guardarAhorro] = useState([]);
    const [ejecutar, guardarEjecutar] = useState(true);
    const [tipo, guardarTipos] = useState([])
    const [cat, guardarCat] = useState([]);
    const [email, guardarEmail] = useState('');
    const [olvide, GuardarOlvide] = useState([]);
    useEffect(() => {
        if (ejecutar) {
            const consultarIngresos = async () => {
                let url = `https://ppibackend-53pyqym6t-santiago55.vercel.app/ingresos/${cookies.get('id')}`;
                const resultado = await axios.get(url);
                guardarIngresos(resultado.data.ingresoBD);
            }

            const consultarEgresos = async () => {
                let url = `https://ppibackend-53pyqym6t-santiago55.vercel.app/egresos/${cookies.get('id')}`;
                const resultado = await axios.get(url);
                guardarEgresos(resultado.data.egresosBD);
            }

            const consultarAhorro = async () => {
                let url = `https://ppibackend-53pyqym6t-santiago55.vercel.app/ahorros/${cookies.get('id')}`;
                const resultado = await axios.get(url);
                guardarAhorro(resultado.data.ahorroBD);

            }

            const consultarTiposIngreso = async () => {
                let url = `https://ppibackend-53pyqym6t-santiago55.vercel.app/tipo`;
                const resultado = await axios.get(url);
                guardarTipos(resultado.data.tipoBD);
            }
            const consultarCat = async () => {
                try {
                    const headers = {
                        'token': cookies.get('token')
                    }

                    let result = await axios.get('https://ppibackend-53pyqym6t-santiago55.vercel.app/categoria', { "headers": headers });
                    guardarCat(result.data.categoriaBD);
                } catch (err) {
                    console.log("Error en la consulta de categoria" + err);
                }
            }
            consultarCat();
            consultarEgresos();
            consultarAhorro();
            consultarIngresos();
            consultarTiposIngreso();
            guardarEjecutar(false);
        }
    }, [ejecutar]);


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/crear-usuario" component={CrearUsuario} />
                <Route exact path="/recuperarContraseña" render={() => (
                    <OlvideContraseña
                        guardarEmail={guardarEmail}
                        email={email}
                        olvide={olvide}
                        GuardarOlvide={GuardarOlvide}
                    />
                )} />
                <Route exact path="/CambiarContraseñaCorreo" render={() => (
                    <OlvideContraseñaCamb
                        olvide={olvide}
                    />
                )} />
                <Layout>
                    <Route exact path="/cambiar-contraseña" component={CambiarContra} />
                    <Route exact path="/movimiento-ingresos" render={() => (
                        <GraficaIngresos
                            ingresos={ingresos}
                            tipo={tipo}
                            guardarEjecutar={guardarEjecutar}
                        />
                    )} />
                    <Route exact path="/movimiento-egresos" render={() => (
                        <GraficaEgresos
                            egresos={egresos}
                            tipo={tipo}
                            categoria={cat}
                            guardarEjecutar={guardarEjecutar}
                        />
                    )} />
                    <Route exact path="/ingresos" render={() => (
                        <Ingresos
                            ingresos={ingresos}
                            guardarEjecutar={guardarEjecutar}
                        />
                    )} />
                    <Route exact path="/agregar-ingreso" render={() => (
                        <AgregarIngreso
                            guardarEjecutar={guardarEjecutar}
                        />
                    )} />
                    <Route exact path="/agregar-ahorro" render={() => (
                        <AgregarAhorro
                            guardarEjecutar={guardarEjecutar}
                            categoria={cat}
                        />
                    )} />

                    <Route exact path="/ahorro" render={() => (
                        <Ahorros
                            ahorros={ahorros}
                            guardarEjecutar={guardarEjecutar}
                        />
                    )} />
                    <Route exact path="/agregar-egreso" render={() => (
                        <AgregarEgreso
                            guardarEjecutar={guardarEjecutar}
                            categoria={cat}
                        />
                    )} />
                    <Route exact path="/editar-egreso/:id" render={(props) => {
                        const Idegreso = props.match.params.id;
                        const egreso = egresos.filter(egreso => egreso._id === Idegreso);
                        return (
                            <EditarEgresos
                                egreso={egreso[0]}
                                guardarEjecutar={guardarEjecutar}
                            />
                        );
                    }}
                    />
                    <Route exact path="/editar-ingreso/:id" render={(props) => {
                        const Idingreo = props.match.params.id;
                        const ingreso = ingresos.filter(ingreso => ingreso._id === Idingreo);
                        return (
                            <EditarIngresos
                                ingreso={ingreso[0]}
                                guardarEjecutar={guardarEjecutar}
                            />
                        )
                    }} />
                    <Route exact path="/egresos" render={() => (
                        <Egresos
                            egresos={egresos}
                            guardarEjecutar={guardarEjecutar}
                        />
                    )} />
                </Layout>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;













































































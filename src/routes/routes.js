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
import '../css/login.css';
function Routes() {
const cookies = new Cookies();
const [ingresos, guardarIngresos] = useState([]);
const [egresos, guardarEgresos] = useState([]);
const [ejecutar, guardarEjecutar] = useState(true);
useEffect(() => {
    if (ejecutar) {
        const consultarIngresos = async () => {
            let url = `http://localhost:3001/ingresos/${cookies.get('id')}`;
            const resultado = await axios.get(url);
            guardarIngresos(resultado.data.ingresoBD);
        }

        const consultarEgresos = async () => {
            let url = `http://localhost:3001/egresos/${cookies.get('id')}`;
            const resultado = await axios.get(url);
            guardarEgresos(resultado.data.egresosBD);
        }
        consultarEgresos();
        consultarIngresos();
        guardarEjecutar(false);
    }
}, [ejecutar]);

return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Layout>
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
                <Route exact path="/agregar-egreso" render={()=>(
                    <AgregarEgreso
                    guardarEjecutar={guardarEjecutar}
                    />
                )}/>
                <Route exact path="/editar-egreso/:id" render={(props)=>{
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
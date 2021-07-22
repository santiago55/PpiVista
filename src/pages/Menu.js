import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import {NavLink, withRouter} from 'react-router-dom'
import '../css/navegacion.css'


function Menu({history}) {
    const cookies = new Cookies();

    const cerrarSesion = ()=>{

        cookies.remove('id',{ path:"/" });
        cookies.remove('nombre',{ path:"/" });
        cookies.remove('apellidos',{ path:"/" });
        cookies.remove('email',{ path:"/" });
        cookies.remove('username',{ path:"/" });
        cookies.remove('token',{ path:"/" });
        
    }
    useEffect(()=>{
        if(!cookies.get('username')){
          history.replace("./");
        }
      },[cookies]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" id="navegacion">
        <div className="container">
            <NavLink to="/Menu" className="navbar-brand">
                <strong>Finance Control</strong>
        </NavLink>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink to="/ingresos" className="nav-link"><strong>Ingresos</strong></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/agregar-ingreso" className="nav-link"><strong>Agregar ingreso</strong></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/egresos" className="nav-link"><strong>Egresos</strong></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/agregar-egreso" className="nav-link"><strong>Agregar egreso</strong></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/movimiento-ingresos" className="nav-link"><strong>Movimientos</strong></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/movimiento-egresos" className="nav-link"><strong>Movimientos Egresos</strong></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" onClick={cerrarSesion}><strong>Cerrar Sesión</strong></NavLink>
                </li>
            </ul>
        </div>
    </nav>
    );
}
export default withRouter(Menu);
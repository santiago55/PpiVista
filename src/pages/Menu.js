import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { NavLink, withRouter } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import '../css/navegacion.css'


function Menu({ history }) {
    const cookies = new Cookies();
    const cerrarSesion = () => {

        cookies.remove('id', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellidos', { path: "/" });
        cookies.remove('email', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('token', { path: "/" });

    }
    useEffect(() => {
        if (!cookies.get('username')) {
            history.replace("./");
        }
    }, [cookies]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" id="navegacion">
            <div className="container">
                <NavLink to="/Menu" className="navbar-brand">
                    <strong>Finance Control</strong>
                </NavLink>
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item dropdown">
                        <NavDropdown title="Ingresos">

                            <li><NavDropdown.Item href="/ingresos" className="dropdown-item"><strong>Lista Ingresos</strong></NavDropdown.Item></li>
                            <li><NavDropdown.Item href="/agregar-ingreso" className="dropdown-item"><strong>Agregar ingreso</strong></NavDropdown.Item></li>
                            <li><NavDropdown.Item href="/movimiento-ingresos" className="dropdown-item"><strong>Movimientos Ingresos</strong></NavDropdown.Item></li>
                        </NavDropdown>
                    </li>

                    <li className="nav-item dropdown">
                        <NavDropdown title="Egresos">

                            <li><NavDropdown.Item href="/egresos" className="dropdown-item"><strong>Lista Egresos</strong></NavDropdown.Item></li>
                            <li><NavDropdown.Item href="/agregar-egreso" className="dropdown-item"><strong>Agregar egreso</strong></NavDropdown.Item></li>
                            <li><NavDropdown.Item href="/movimiento-egresos" className="dropdown-item"><strong>Movimientos Egresos</strong></NavDropdown.Item></li>
                        </NavDropdown>
                    </li>

                    <li className="nav-item dropdown">
                        <NavDropdown title="Ahorros">

                            <li><NavDropdown.Item href="/ahorro" className="dropdown-item"><strong>Lista Ahorros</strong></NavDropdown.Item></li>
                            <li><NavDropdown.Item href="/agregar-ahorro" className="dropdown-item"><strong>Agregar Ahorro</strong></NavDropdown.Item></li>
                            {/*<li><NavDropdown.Item href="/movimiento-egresos" className="dropdown-item"><strong>Movimientos Egresos</strong></NavDropdown.Item></li>*/}
                        </NavDropdown>
                    </li>
                    <li className="nav-item dropdown">
                        <NavDropdown title="Opciones">
                            <li><NavDropdown.Item href="/cambiar-contraseña" className="dropdown-item"><strong>Cambiar Contraseña</strong></NavDropdown.Item></li>
                        </NavDropdown>
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
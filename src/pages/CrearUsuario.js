import React, { useState } from 'react';
import '../css/CrearUsuario.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import Error from '../pages/Error'

function CrearUsuario({ history }) {

    const[error, guardarError]=useState(false);
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        userName: '',
        password: ''
    });

    const guardarDatos = e => {
        e.preventDefault();
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value

        });
    }

    const crearUsuario = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('https://ppibackend-rm6m2tlgn-santiago55.vercel.app/user', {
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                email: usuario.email,
                userName: usuario.userName,
                password: usuario.password
            });

            if (result.status === 200) {
                //guardarError(true);
                alert("Confirmar usuario");
                Swal.fire(
                    'Usuario Creado',
                    'El Usuario se ha creado exitosamente',
                    'success'
                )
                history.push('/');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error, vuelve a intentarlo'
            })
        }

    }
    return (
        <div className="wraper">
            <div className="formulario">
                <h1>Crear Usuario</h1>
                <form
                onSubmit={crearUsuario}
                >
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        onChange={guardarDatos}
                        required
                    />
                    <input
                        type="text"
                        id="apellido"
                        name="apellidos"
                        placeholder="Apellidos"
                        onChange={guardarDatos}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={guardarDatos}
                        required
                    />
                    <input
                        type="text"
                        id="usuario"
                        name="userName"
                        placeholder="Usuario"
                        onChange={guardarDatos}
                        required
                    />
                    <input
                        type="password"
                        id="contraseña"
                        name="password"
                        placeholder="Contraseña"
                        onChange={guardarDatos}
                        required
                    />
                    <input
                        type="submit"
                        id="crearusuario"
                        value="Crear usuario"
                    />
                </form>
                {(error) ? <Error mensaje='Se le envio un correo a su correo personal para confirmar usuario'/> : null}
            </div>
        </div>
    );

}

export default withRouter(CrearUsuario);

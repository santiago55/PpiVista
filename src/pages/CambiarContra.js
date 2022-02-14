import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'universal-cookie';
function CambiarContra({ history }) {

    const [datos, guardarDatos] = useState({
        password: '',
        newpassword: ''
    });
    const cookies = new Cookies();
    const obtenerDatos = (e) => {

        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    const cambiarContraseña = async (e) => {
        e.preventDefault();
        let id = cookies.get('id');
        let url = `https://ppibackend-rm6m2tlgn-santiago55.vercel.app/user/${id}`;
        try {
            if (datos.password === datos.newpassword) {
                const result = await axios.put(url, { password: datos.password });
                if (result.status === 200) {
                    Swal.fire(
                        'Contraseña cambiada',
                        'La contraseña ha sido cambiada',
                        'success'
                    )
                    cookies.remove('id', { path: "/" });
                    cookies.remove('nombre', { path: "/" });
                    cookies.remove('apellidos', { path: "/" });
                    cookies.remove('email', { path: "/" });
                    cookies.remove('username', { path: "/" });
                    cookies.remove('token', { path: "/" });
                    alert("Por favor ingrese nuevamente con la nueva contraseña");
                    history.push('/');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Las contraseñas no son iguales'
                })
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="wraper">
            <div className="formulario">
                <h1>Cambiar Contraseña</h1>
                <br />
                <br />
                <form
                onSubmit={cambiarContraseña}
                >
                    <label>Ingrese nueva contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        name="password"
                        placeholder="Nueva Contraseña"
                        onChange={obtenerDatos}
                    />
                    <label>Confirme contraseña</label>
                    <input
                        type="password"
                        id="email"
                        name="newpassword"
                        placeholder="Confirmar Contraseña"
                        onChange={obtenerDatos}
                    />
                    <input type="submit"
                        value="Cambiar Contraseña"
                    />
                </form>
            </div>
        </div>
    );
};

export default CambiarContra;
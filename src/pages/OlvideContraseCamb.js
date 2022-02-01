import React, { useState } from 'react';
import '../css/CrearUsuario.css'
import Cookies from 'universal-cookie';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
const cookies = new Cookies();
function OlvideContraseñaCamb({ history }) {
    let id = cookies.get('idol');
    const [password, guardarPassword] = useState('');
    const [newpassword, guardarPasswordNew] = useState('');

    const guardarDatosOld = (e) => {
        guardarPassword(e.target.value);
    }
    const guardarDatosNew = (e) => {
        guardarPasswordNew(e.target.value);
    }

    const cambiarContraseña = async (e) => {
        e.preventDefault();

        if (password === newpassword) {
            let url = `https://ppibackend-53pyqym6t-santiago55.vercel.app/user/${id}`;
            
            let result = await Axios.put(url, {
                password: newpassword
            });
            Swal.fire(
                'Contraseña recuperada',
                'La contraseña se recupero exitosamente',
                'success'
            )
            history.push('/');

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden'
            })
        }

    }
    return (
        <div className="wraper">
            <div className="formulario">
                <h1>Cambiar Contraseña</h1>
                <br />
                <br />
                <form
                >
                    <label>Ingrese la nueva contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        name="password"
                        placeholder="Contraseña"
                        onChange={guardarDatosOld}
                    />
                    <label>Confirmar nueva contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        name="password"
                        placeholder="Contraseña"
                        onChange={guardarDatosNew}
                    />
                    <input
                        type="submit"
                        value="Cambiar Contraseña"
                        onClick={cambiarContraseña}
                    />
                </form>
            </div>
        </div>
    );

}

export default withRouter(OlvideContraseñaCamb);
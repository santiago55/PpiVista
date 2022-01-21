import React, { useState } from 'react';
import '../css/CrearUsuario.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function OlvideContraseña({ guardarEmail, email, GuardarOlvide, olvide }) {
    
    
    const guardarEmails = e => {
        guardarEmail(e.target.value);
    }

    const enviarCorreoRecuperar = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('http://localhost:3001/recuperarcontra'/*'https://ppibackend-53pyqym6t-santiago55.vercel.app/recuperarcontra'*/, {
                email: email
            });
            if (result.status === 200) {
                console.log(result.data.usuarioUpdate._id);
                cookies.set('idol', result.data.usuarioUpdate._id, { path:"/" });
                alert("El link de recuperación se enviara al correo ingresado");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="wraper">
            <div className="formulario">
                <h1>Recuperar Contraseña</h1>
                <br />
                <br />
                <form
                >
                    <label>Ingrese su correo electronico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={guardarEmails}
                        placeholder="Correo electronico"
                    />
                    <input type="submit"
                        value="Recuperar contraseña"
                        onClick={enviarCorreoRecuperar}
                    />
                </form>
            </div>
        </div>
    );

}

export default OlvideContraseña;
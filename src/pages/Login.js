import React, { useState, useEffect } from 'react'
import '../css/login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter, Link} from 'react-router-dom'

const cookies = new Cookies();

function Login({history}) {

  const [userName, guardarUsername] = useState('');
  const [password, guardarPassword] = useState('');
  const [ejec, guardarEjec] = useState(true);

  const iniciarSesion = async (e) => {

    e.preventDefault();
    await axios.post('http://localhost:3001/login', {
      userName,
      password
    })
      .then(response => {
        let datos = response.data;
        //console.log(datos.usuario._id);
        cookies.set('id', datos.usuario._id, { path:"/" });
        cookies.set('nombre', datos.usuario.nombre, { path:"/" });
        cookies.set('apellidos', datos.usuario.apellidos, { path:"/" });
        cookies.set('email', datos.usuario.email, { path:"/" });
        cookies.set('username', datos.usuario.userName, { path:"/" });
        cookies.set('token', datos.token, { path:"/" });
        alert(`Bienvenido ${datos.usuario.nombre}!!`);
        window.location.href="./ingresos";
      })
      .catch(error => {
        alert('Usuario o contraseña no son correctos');
        console.log(error);
      });
  }

  useEffect(()=>{
    if(ejec){
    if(cookies.get('username')){
      history.replace("./ingresos");
    }
  }
  guardarEjec(false);
  },[ejec, history]);

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 id="tituloinicio">FINANCE CONTROL</h2>
        <form>
          <input type="text"
            id="user"
            name="username"
            placeholder="Usuario"
            className="fadeIn second"
            onChange={e => guardarUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Contraseña"
            onChange={e => guardarPassword(e.target.value)}
          />
          <input
            type="submit"
            id="inicio"
            className="fadeIn fourth"
            value="Iniciar Sesión"
            onClick={iniciarSesion}
          />
        </form>
        <div id="formFooter">
          <Link className="underlineHover" to="#">Olvide la contraseña</Link>
          <br></br>
          <Link className="underlineHover" to="#">Registrarse</Link>
        </div>
      </div>
    </div>
  );

}
export default withRouter(Login);

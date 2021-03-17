import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
function AgregarEgreso({ guardarEjecutar, history }) {

const cookies = new Cookies();
const [egreso, guardarEgreso] = useState({
descripcion: '',
valor: '',
date: '',
categoria: '',
tipo: '',
usuario: cookies.get('id')
});

const guardarDatos = e => {
e.preventDefault();
guardarEgreso({
    ...egreso,
    [e.target.name]: e.target.value
});
console.log(egreso);
}

const crearEgreso = async (e) => {
e.preventDefault();
const headers = {
    'token': cookies.get('token')
}
try {

    const result = await axios.post('http://localhost:3001/egresos', {
        descripcion: egreso.descripcion,
        valor: egreso.valor,
        date: egreso.date,
        categoria: egreso.categoria,
        tipo: egreso.tipo,
        usuario: egreso.usuario
    },  { "headers": headers });
    if (result.status === 200) {
        Swal.fire(
            'Egreso Creado',
            'El egreso se ha creado exitosamente',
            'success'
        )
        guardarEjecutar(true);
        history.push('/egresos');
    }
} catch (err) {
    console.log(err);
    Swal.fire({
        icon: 'error',
        title: 'Hubo un error, vuelve a intentarlo'
    })
}

}

return (
<div className="col-md-8 mx-auto py-5">
    <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Agregar Egreso</h1>
        <form
        onSubmit={crearEgreso}
            className="mt-5"
        >
            <label>Descripción</label>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    placeholder="Descripción"
                    onChange={guardarDatos}
                />
            </div>
            <label>Valor</label>
            <div className="form-group">
                <input
                    type="number"
                    className="form-control"
                    name="valor"
                    placeholder="Valor"
                    onChange={guardarDatos}
                />
            </div>
            <label>Categoria</label>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="categoria"
                    placeholder="Categoria"
                    onChange={guardarDatos}
                />
            </div>
            <label>Fecha</label>
            <div className="form-group">
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    onChange={guardarDatos}
                />
            </div>
            <legend className="text-center">Tipo de Egreso:</legend>
            <div className="text-center">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipo"
                        value="Fijo"
                        onChange={guardarDatos}
                    />
                    <label className="form-check-label">
                        Fijo
                </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipo"
                        value="Extraordinario"
                        onChange={guardarDatos}
                    />
                    <label className="form-check-label">
                        Extraordinario
                </label>
                </div>
            </div>
            <input type="submit"
                className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                value="Agregar Egreso"
            />
        </form>
    </div>
</div>
);

}

export default withRouter(AgregarEgreso);
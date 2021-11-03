import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
function AgregarIngreso({ guardarEjecutar,  history}) {

    const cookies = new Cookies();
    const [ingreso, guardarIngreso] = useState({
        descripcion: '',
        valor: '',
        date: '',
        tipo: '',
        usuario: cookies.get('id')
    });

    const guardarDatos = e => {
        guardarIngreso({
            ...ingreso,
            [e.target.name]: e.target.value
        });
        
    }
    const crearIngreso = async (e) => {
        e.preventDefault();
        const headers = {
            'token': cookies.get('token')
        }
        let url = `https://ppibackend-53pyqym6t-santiago55.vercel.app/ingresos`;
        try {
            const resultado = await axios.post(url, {
                descripcion: ingreso.descripcion,
                valor: ingreso.valor,
                date: ingreso.date,
                tipo: ingreso.tipo,
                usuario: ingreso.usuario
            }, { "headers": headers });

            if (resultado.status === 200) {
                Swal.fire(
                    'Ingreso Creado',
                    'El ingreso se ha creado exitosamente',
                    'success'
                )
                guardarEjecutar(true);
                history.push('/ingresos');
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
        <div className="col-md-8 mx-auto py-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Agregar Ingreso</h1>
                <form
                    onSubmit={crearIngreso}
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
                    <label>Fecha</label>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            onChange={guardarDatos}
                        />
                    </div>
                    <legend className="text-center">Tipo de ingreso:</legend>
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
                        value="Agregar Ingreso"
                    />
                </form>
            </div>
        </div>
    );

}
export default withRouter(AgregarIngreso);
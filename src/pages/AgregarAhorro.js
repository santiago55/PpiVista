import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/select.css';
import ListaCategoria from '../pages/ListaCategoria';
import { withRouter } from 'react-router-dom'
function AgregarAhorro({ guardarEjecutar, history, categoria }) {

    const cookies = new Cookies();
    const [ahorro, guardarAhorro] = useState({
        descripcion: '',
        date: '',
        valor: '',
        usuario: cookies.get('id')
    });

    const guardarDatos = e => {
        e.preventDefault();
        guardarAhorro({
            ...ahorro,
            [e.target.name]: e.target.value
        });
        console.log(ahorro);
    }

    const crearAhorro = async (e) => {
        e.preventDefault();
        const headers = {
            'token': cookies.get('token')
        }
        try {

            const result = await axios.post('https://ppibackend.vercel.app/ahorros', {
                descripcion: ahorro.descripcion,
                valor: ahorro.valor,
                date: ahorro.date,
                usuario: ahorro.usuario
            }, { "headers": headers });
            if (result.status === 200) {
                Swal.fire(
                    'Ahorro Creado',
                    'El Ahorro se ha creado exitosamente',
                    'success'
                )
                guardarEjecutar(true);
                history.push('/ahorros');
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
                <h1 className="text-center">Agregar Ahorro</h1>
                <form
                    onSubmit={crearAhorro}
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
                    <input type="submit"
                        className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                        value="Agregar Ahorro"
                    />
                </form>
            </div>
        </div>
    );

}

export default withRouter(AgregarAhorro);
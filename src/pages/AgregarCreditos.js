import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import ListaCreditos from '../pages/ListaCreditos';
function AgregarCreditos({ guardarEjecutar,  history,tipoCredito}) {

    const cookies = new Cookies();
    const [credito, guardarCredito] = useState({
        descripcion: '',
        valor: '',
        nroCuotas: '',
        tipoCredito: '',
        fechaRegistro:'',
        fechaCorte:'',
        porcjintMens:'',
        usuario: cookies.get('id')
    });

    const guardarDatos = e => {
        guardarCredito({
            ...credito,
            [e.target.name]: e.target.value
        });
        
    }
    const crearCredito = async (e) => {
        e.preventDefault();
        const headers = {
            'token': cookies.get('token')
        }
        let url = `http://localhost:3001/creditos`;
        try {
            const resultado = await axios.post(url, {
                descripcion: credito.descripcion,
                valor: credito.valor,
                nroCuotas: credito.cuotas,
                tipoCredito: credito.tipo,
                fechaRegistro: credito.fecharegistro,
                fechaCorte: credito.fechaCorte,
                porcjintMens: credito.porcentaje,
                usuario: credito.usuario
            }, { "headers": headers });

            if (resultado.status === 200) {
                Swal.fire(
                    'Credito Creado',
                    'El credito se ha creado exitosamente',
                    'success'
                )
                guardarEjecutar(true);
                history.push('/creditos');
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
                <h1 className="text-center">Agregar Credito</h1>
                <form
                    onSubmit={crearCredito}
                    className="mt-5"
                >
                    <label>Fecha Registro</label>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            name="fechaRegistro"
                            onChange={guardarDatos}
                        />
                    </div>
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
                    <label>Valor Credito</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="valor"
                            placeholder="Valor"
                            onChange={guardarDatos}
                        />
                    </div>
                    <label>Número Cuotas</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="nroCuotas"
                            placeholder="nroCuotas"
                            onChange={guardarDatos}
                        />
                    </div>
                    <label>Fecha Corte</label>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            name="fechaCorte"
                            onChange={guardarDatos}
                        />
                    </div>
                    <label>Tipo de credito:</label>
                    <div className="form-group">
                        <select
                            name="tipoCredito"
                            className="form-control"
                            onChange={guardarDatos}
                        >
                            <option>Seleccione una categoria</option>
                            {tipoCredito.map(tipo => (
                                <ListaCreditos
                                    credito={tipo}
                                />
                            )
                            )
                            }
                        </select>
                    </div>
                    <label>Porcentaje Interes Mensual</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="porcjintMens"
                            onChange={guardarDatos}
                        />
                    </div>
                    <input type="submit"
                        className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                        value="Agregar Credito"
                    />
                </form>
            </div>
        </div>
    );

}
export default withRouter(AgregarCreditos);
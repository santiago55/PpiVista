import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import TipoCreditos from '../pages/TipoCreditos';
function AgregarCreditos({ guardarEjecutar, history, tipoCredito }) {

    const cookies = new Cookies();
    const [credito, guardarCredito] = useState({
        descripcion: '',
        valor: '',
        nroCuotas: '',
        tipoCredito: '',
        fechaRegistro: '',
        fechaCorte: '',
        porcentaje: '',
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
        let url = `https://ppibackend.vercel.app/creditos`;
        try {
            const resultado = await axios.post(url, {
                descripcion: credito.descripcion,
                valor: credito.valor,
                nroCuotas: credito.nroCuotas,
                tipoCredito: credito.tipoCredito,
                fechaRegistro: credito.fechaRegistro,
                fechaCorte: credito.fechaCorte,
                porcentaje: credito.porcentaje,
                usuario: credito.usuario
            }, { "headers": headers });
            let i = 0;
            let n = 0;
            if (resultado.status === 200) {
                let date = credito.fechaCorte.split('T')[0];
                let fechaCorte = parseInt(date.split('-')[1]);
                let año = parseInt(date.split('-')[0]);
                i = fechaCorte;
                do {
                    let date_total = '';
                    if (i > 12) {
                        i = 1;
                        año += 1;
                    }
                    n += 1;
                    date_total = año + "-" + i.toString() + "-" + credito.fechaCorte.split('-')[2];
                    let valorCuota = credito.valor / credito.nroCuotas;
                    let aux = (credito.porcentaje / 100) * valorCuota;
                    valorCuota += aux;
                    try {
                        let url = `https://ppibackend.vercel.app/Detalle`;
                        const resultado2 = await axios.post(url, {
                            nroCuotas: n,
                            valor: valorCuota,
                            fechaCuota: date_total,
                            descripcion: '',
                            estado: 'Pendiente',
                            idCredito: resultado.data.creditosBD._id

                        }, { "headers": headers });
                        console.log(resultado2);
                    } catch (err) {
                        console.log(err);
                    }
                    i++;
                } while (n < parseInt(credito.nroCuotas));



                setTimeout(function () {
                    Swal.fire(
                        'Credito Creado',
                        'El credito se ha creado exitosamente',
                        'success'
                    )

                    guardarEjecutar(true);
                    let date = new Date();
                    console.log("Ffechas" + date)
                    history.push('/creditos');
                }, 1000);

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
                    <label>Fecha Registro *</label>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            name="fechaRegistro"
                            onChange={guardarDatos}
                            required
                        />
                    </div>
                    <label>Descripción *</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="descripcion"
                            placeholder="Descripción"
                            onChange={guardarDatos}
                            required
                        />
                    </div>
                    <label>Valor Credito *</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="valor"
                            placeholder="Valor"
                            onChange={guardarDatos}
                            required
                            min={1}
                        />
                    </div>
                    <label>Número Cuotas *</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="nroCuotas"
                            placeholder="nroCuotas"
                            onChange={guardarDatos}
                            required
                        />
                    </div>
                    <label>Fecha Corte *</label>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            name="fechaCorte"
                            onChange={guardarDatos}
                            required
                        />
                    </div>
                    <label>Tipo de credito: *</label>
                    <div className="form-group">
                        <select
                            name="tipoCredito"
                            className="form-control"
                            onChange={guardarDatos}
                            required
                        >
                            <option>Seleccione una categoria</option>
                            {tipoCredito.map(tipo => (
                                <TipoCreditos
                                    credito={tipo}
                                />
                            )
                            )
                            }
                        </select>
                    </div>
                    <label>Porcentaje Interes Mensual (Opcional)</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="porcentaje"
                            step="0.1"
                            defaultValue={0}
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
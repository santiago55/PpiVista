import React, { useState, useRef } from 'react'
import '../css/ingresos.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import TipoCreditos from '../pages/TipoCreditos';
//{(error) ? <Error mensaje='Todos los campos son obligatorios.' /> : null}
function EditarCreditos(props) {

    const { credito, guardarEjecutar, history } = props;
    const descripcionRef = useRef('');
    const valorRef = useRef('');
    const nroCuotasRef = useRef('');
    const tipoCrediRef= useRef('');
    const [tipoCredi, guardarTipoCred] = useState('');



    const editarcredito = async (e) => {
        e.preventDefault();
        const tipocredi = (tipoCredi === '') ? credito.tipoCredito : tipoCredi;
        //console.log(categoriIng)
        if (descripcionRef === '' || valorRef === '' || tipocredi === '' || nroCuotasRef==='') {
            return;
        }

        let url = `http://localhost:3001/creditos/${credito._id}`;

        try {
            let resultado = await axios.put(url, {
                descripcion: descripcionRef.current.value,
                valor: valorRef.current.value,
                tipoCredito: tipocredi,
                nroCuotas:nroCuotasRef.current.value
            });
            if (resultado.status === 200) {
                Swal.fire(
                    'credito Editado',
                    'El credito se editó correctamente',
                    'success'
                )
                guardarEjecutar(true);
                history.push('/creditos');
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error, vuelve a intentarlo'
            })
        }

    }

    return (
        <div className="col-md-8 mx-auto py-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Editar credito</h1>
                <form
                    onSubmit={editarcredito}
                    className="mt-5"
                >
                    <label>Descripción</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            placeholder="Descripción"
                            ref={descripcionRef}
                            defaultValue={credito.descripcion}
                        />
                    </div>
                    <label>Valor</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="precio"
                            placeholder="Valor"
                            ref={valorRef}
                            defaultValue={credito.valor}
                        />
                    </div>
                    <legend className="text-center">Tipo de credito:</legend>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="tipoCredito"
                            placeholder="TipoCredito"
                            ref={tipoCrediRef}
                            defaultValue={credito.tipoCredito}
                        />
                    </div>
                        <label>NroCuotas </label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="nroCuotas"
                            placeholder="NroCuotas"
                            ref={nroCuotasRef}
                            defaultValue={credito.nroCuotas}
                        />
                    </div>


                    <input type="submit"
                        className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                        value="Actualizar credito"
                    />
                </form>
            </div>
        </div>
    );
}

export default withRouter(EditarCreditos);
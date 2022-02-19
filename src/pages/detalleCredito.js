import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaDetalleCredito from './ListaDetalleCredito';
import Cookies from 'universal-cookie';

function DetalleCredito({ creditos,ejecutar2,guardarEjecutar2,guardarEjecutar }) {
    const cookies = new Cookies();
    const [detalle,guardarDetalle] = useState([]);
    useEffect(() => {
        if(ejecutar2){
        const consultarDetalleCredito = async () => {
            let url = `https://ppibackend.vercel.app/Detalle/${cookies.get('idCred')}`;
            const resultado = await axios.get(url);
            guardarDetalle(resultado.data.detallecreditosBD);
        }
        consultarDetalleCredito();
        guardarEjecutar2(false);
        guardarEjecutar(false);
    }
    }, [creditos,ejecutar2]);

    return (
        <div className="container p-4">
        <div className="row">
            <div className="col-md-4 p-2">
                <div>
                    <table id="tabla" className="table">
                        <thead>
                            <tr>
                                <th checkboxSelection></th>
                                <th>Numero de Cuota</th>
                                <th>Fecha Corte</th>
                                <th>Valor Cuota</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalle.map(detalle1 => (
                                <ListaDetalleCredito
                                    key={detalle1._id}
                                    detalle1={detalle1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default DetalleCredito;

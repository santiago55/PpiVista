import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaDetalleCredito from './ListaDetalleCredito';

function DetalleCredito({ creditos }) {
    const [detalle,guardarDetalle] = useState([]);
    useEffect(() => {
        const consultarDetalleCredito = async () => {
            let url = `http://localhost:3001/Detalle/${creditos._id}`;
            const resultado = await axios.get(url);
            guardarDetalle(resultado.data.detallecreditosBD);
        }
        consultarDetalleCredito();
    }, [creditos]);
    console.log()
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

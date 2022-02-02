import React from 'react';

function ListaDetalleCredito({ detalle1 }) {




    return (
        <tr key={detalle1._id}>
            <td></td>
            <td>{detalle1.nroCuotas}</td>
            <td>{detalle1.fechaCuota}</td>
            <td>{detalle1.estado}</td>
        </tr>
    );
}

export default ListaDetalleCredito;

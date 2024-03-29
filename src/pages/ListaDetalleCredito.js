import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../css/detalle.css';
function ListaDetalleCredito({ detalle1 }) {

    const cookies = new Cookies();
    const style = {
        color: 'green'
    };

    const styleDesaparecer = {
        display: 'none'
    };
 

const OnClick = async (e) => {
    const headers = {
        'token': cookies.get('token')
    }
    console.log(detalle1._id);
    try {
        let result = await axios.put(`https://ppibackend.vercel.app/Detalle/${detalle1._id}`, {
            estado: "Pagado"
        },
            { "headers": headers });
        if (result.status === 200) {
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
}

return (

    <tr key={detalle1._id}>
        <td></td>
        <td>{detalle1.nroCuotas}</td>
        <td>{detalle1.fechaCuota}</td>
        <td>{detalle1.valor}</td>
        <td style={detalle1.estado === "Pagado" ? style : null}>{detalle1.estado}</td>
        <td><button className="pagar" onClick={OnClick} style={detalle1.estado === "Pagado" ? styleDesaparecer : null}>Pagar</button></td>
    </tr>
);
}

export default ListaDetalleCredito;

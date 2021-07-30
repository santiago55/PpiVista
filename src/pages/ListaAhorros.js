import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../css/ingresos.css'
import axios from 'axios'
import Cookies from 'universal-cookie';

function ListaAhorros({ ahorro1, guardarEjecutar }) {

    const cookies = new Cookies();

    const eliminarAhorro = id => {
        const headers = {
            'token': cookies.get('token')
        }
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Si eliminas un ahorro no podrás revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let url = `http://localhost:3001/ahorros/${ahorro1._id}`;
                await axios.delete(url, { "headers": headers });
            }
            guardarEjecutar(true);
        })
    }
    let fechaOrganizada = ahorro1.date.split('T')[0];
    fechaOrganizada = fechaOrganizada.split('-').reverse().join('-');
    return (
        <Fragment>
            <tr key={ahorro1._id}>
                <td></td>
                <td>{ahorro1.descripcion}</td>
                <td>{ahorro1.valor}</td>
                <td>{ahorro1.categoria}</td>
                <td>{fechaOrganizada}</td>
                <td><button type="button" id="eliminar"
                className="btn btn-danger"
                onClick={() => { eliminarAhorro(ahorro1._id) }}
            >Eliminar &times;</button></td>
            </tr>
            
        </Fragment>


    );
}
export default ListaAhorros;
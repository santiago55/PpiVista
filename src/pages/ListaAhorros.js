import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../css/ingresos.css'
import axios from 'axios'
import Cookies from 'universal-cookie';

function ListaAhorros(props) {

    const cookies = new Cookies();
    const { ahorro, guardarEjecutar } = props;

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
                let url = `http://localhost:3001/ahorros/${ahorro._id}`;
                await axios.delete(url, { "headers": headers });
            }
            guardarEjecutar(true);
        })
    }
    console.log(ahorro)
//    let fechaOrganizada = ahorros.date.split('T')[0];
  //  fechaOrganizada = fechaOrganizada.split('-').reverse().join('-');
    return (
        <div className="col-md-4 p-2">
            <div>
                <table id="tabla" className="table">
                    <thead>
                        <tr>
                            <th checkboxSelection></th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th>fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                                <tr key={ahorro._id}>
                                    <td>{ahorro.descripcion}</td>
                                    <td>{ahorro.valor}</td>
                                    <td>{ahorro.categoria}</td>
                                    <td>{ahorro.date}</td>
                                    <td><button type="button" id="eliminar"
                                        className="btn btn-danger"
                                        onClick={() => { eliminarAhorro(ahorro._id)}}
                                    >Eliminar &times;</button> </td>
                                </tr>
                           
                       

                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ListaAhorros;
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../css/ingresos.css'
import axios from 'axios'
import Cookies from 'universal-cookie';

function ListaEgresos(props) {

    const cookies = new Cookies();
    const { egreso, guardarEjecutar } = props;

    const eliminarEgreso = id => {
        const headers = {
            'token': cookies.get('token')
        }
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Si eliminas un egreso no podrás revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let url = `http://localhost:3001/egresos/${egreso._id}`;
                await axios.delete(url, { "headers": headers });
            }
            guardarEjecutar(true);
        })
    }
    let fechaOrganizada = egreso.date.split('T')[0];
    fechaOrganizada = fechaOrganizada.split('-').reverse().join('-');
    return (        
        <div className="col-md-4 p-2">
            <div id="carta" className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5>{egreso.descripcion}</h5>
                    <Link className="btn btn-danger" id="actualizar" to={`/editar-egreso/${egreso._id}`}>Actualizar</Link>
                </div>
                <div className="card-body">
                    <p>Valor: ${egreso.valor}</p>
                    <p>Tipo de egreso: {egreso.tipo}</p>
                    <p>Categoria: {egreso.categoria}</p>
                    <p>Fecha: {fechaOrganizada}</p>
                    <button type="button" id="eliminar"
                        className="btn btn-danger"
                        onClick={() => { eliminarEgreso(egreso._id) }}
                    >Eliminar &times;</button>
                </div>

            </div>
        </div>
    );
}
export default ListaEgresos;
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../css/ingresos.css'
import axios from 'axios'
import Cookies from 'universal-cookie';

function ListaCreditos(props) {

    const cookies = new Cookies();
    const { creditos, guardarEjecutar } = props;

    const eliminarcreditos = id => {
        const headers = {
            'token': cookies.get('token')
        }
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Si eliminas un creditos no podrás revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let url = `http://localhost:3001/creditos/${creditos._id}`;
                await axios.delete(url, { "headers": headers });
            }
            guardarEjecutar(true);
        })
    }
    console.log(creditos);
    let fechaOrganizada = creditos.fechaRegistro.split('T')[0];
    fechaOrganizada = fechaOrganizada.split('-').reverse().join('-');
    return (        
        <div className="col-md-4 p-2">
            <div id="carta" className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5>{creditos.descripcion}</h5>
                    <Link className="btn btn-danger" id="actualizar" to={`/editar-creditos/${creditos._id}`}>Actualizar</Link>
                </div>
                <div className="card-body">
                    <p>Fecha: {fechaOrganizada}</p>
                    <p>Tipo de creditos: {creditos.tipoCredito}</p>
                    <p>Valor: ${creditos.valor}</p>
                    <p>Nro Cuotas: {creditos.nroCuotas}</p>
                    <p>Categoria: {creditos.categoria}</p>
                    <p>Porcentaje interes: {creditos.porcentaje}</p>
                    <button type="button" id="eliminar"
                        className="btn btn-danger"
                        onClick={() => { eliminarcreditos(creditos._id) }}
                    >Eliminar &times;</button>
                </div>

            </div>
        </div>
    );
}
export default ListaCreditos;
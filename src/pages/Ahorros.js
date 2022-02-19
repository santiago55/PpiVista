import React from 'react'
import ListaAhorros from './ListaAhorros'

function Ahorros({ ahorros, guardarEjecutar }) {

    return (

        <div className="container p-4">
            <div className="row">
                <div className="col-md-4 p-2">
                    <div>
                        <table id="tabla" className="table">
                            <thead>
                                <tr>
                                    <th checkboxSelection></th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ahorros.map(ahorro1 => (
                                    <ListaAhorros
                                        key={ahorro1._id}
                                        guardarEjecutar={guardarEjecutar}
                                        ahorro1={ahorro1}
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
export default Ahorros;
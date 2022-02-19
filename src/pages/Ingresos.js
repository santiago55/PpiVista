import axios from 'axios';
import React, { Fragment } from 'react'
import ListaIngresos from './ListaIngresos'

function Ingresos({ ingresos, guardarEjecutar }) {

    return (
        <Fragment>
            <div className="container p-4">
                <div className="row">
                    {ingresos.map(ingreso => (
                        <ListaIngresos
                            key={ingreso._id}
                            guardarEjecutar={guardarEjecutar}
                            ingreso={ingreso}
                        />
                    ))}
                </div>
            </div>
        </Fragment>

    );
}
export default Ingresos;
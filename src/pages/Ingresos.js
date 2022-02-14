import axios from 'axios';
import React, { Fragment } from 'react'
import ListaIngresos from './ListaIngresos'
import Cookies from 'universal-cookie';

function Ingresos({ ingresos, guardarEjecutar }) {
    const cookies = new Cookies();


    const filtroFecha = (e) => {
        e.preventDefault();

        let mes = e.target.value;
        mes = mes.split('-')[1];
        ingresos.forEach(ingre => {
            let ingresosFiltro = [];
            let ingresoTodos = ingre.date.split('T')[0];
            ingresoTodos = ingresoTodos.split('-')[1];
            if (mes === ingresoTodos) {
                ingresosFiltro.push(ingre);
                ingresos = ingresosFiltro;
                console.log("Entro")
            }
        });
        //guardarEjecutar(true);
    }
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
import React from 'react'
import ListaEgresos from './ListaEgresos'

function Egresos({egresos, guardarEjecutar}) {
   
    return (
        <div className="container p-4">
            <div className="row">
                {egresos.map(egreso => (
                    <ListaEgresos
                        key={egresos._id}
                        guardarEjecutar={guardarEjecutar}
                        egreso={egreso}
                    />
                ))}
            </div>
        </div>
    );
}
export default Egresos;
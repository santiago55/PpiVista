import React from 'react'
import ListaAhorros from './ListaAhorros'

function Ahorros({ahorros, guardarEjecutar}) {
   
    return (
        <div className="container p-4">
            <div className="row">
                {ahorros.map(ahorro => (
                    <ListaAhorros
                        key={ahorro._id}
                        guardarEjecutar={guardarEjecutar}
                        ahorro={ahorro}
                    />
                ))}
            </div>
        </div>
    );
}
export default Ahorros;
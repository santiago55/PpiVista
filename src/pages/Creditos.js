import React from 'react'
import ListaCreditos from './ListaCreditos'

function Creditos({creditos, guardarEjecutar}) {
   
    return (
        <div className="container p-4">
            <div className="row">
                {creditos.map(credito => (
                    <ListaCreditos
                        key={credito._id}
                        guardarEjecutar={guardarEjecutar}
                        credito={credito}
                    />
                ))}
            </div>
        </div>
    );
}
export default Creditos;
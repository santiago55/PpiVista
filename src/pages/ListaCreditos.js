import React, { useState, Fragment } from 'react';

function ListaCreditos(props) {

    const { credito } = props;
    return (
        <Fragment>
            <option>{credito.nombre}</option>
        </Fragment>
    );

}

export default ListaCreditos;
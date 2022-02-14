import React, { useState, Fragment } from 'react';

function TipoCreditos(props) {

    const { credito } = props;
    return (
        <Fragment>
            <option>{credito.nombre}</option>
        </Fragment>
    );

}

export default TipoCreditos;
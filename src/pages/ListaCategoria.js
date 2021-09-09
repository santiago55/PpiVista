import React, { useState, Fragment } from 'react';

function ListaCategoria(props) {

    const { categori } = props;
    return (
        <Fragment>
            <option>{categori.categoria}</option>
        </Fragment>
    );

}

export default ListaCategoria;
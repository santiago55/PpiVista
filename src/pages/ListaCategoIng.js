import React, {Fragment } from 'react';

function ListaCategoIng(props) {

    const { categori } = props;
    return (
        <Fragment>
            <option>{categori.categoria}</option>
        </Fragment>
    );

}

export default ListaCategoIng;
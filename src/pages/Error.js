import React from 'react';

function Error({ mensaje }) {
    return (
        <p className="alert my-5 text-uppercase">{mensaje}</p>
    );
}
export default Error;
import React, { useState, useRef } from 'react'
import '../css/ingresos.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
//{(error) ? <Error mensaje='Todos los campos son obligatorios.' /> : null}
function EditarIngreso(props) {

    const { ingreso, guardarEjecutar, history } = props;
    const descripcionRef = useRef('');
    const valorRef = useRef('');
    const [categoria, guardarCategoria] = useState('');



    const editarIngreso = async (e) => {
        e.preventDefault();
        const categoriIng = (categoria === '') ? ingreso.tipo : categoria;
        //console.log(categoriIng)
        if (descripcionRef === '' || valorRef === '' || categoriIng === '') {
            return;
        }

        let url = `http://localhost:3001/ingresos/${ingreso._id}`;

        try {
            let resultado = await axios.put(url, {
                descripcion: descripcionRef.current.value,
                valor: valorRef.current.value,
                tipo: categoriIng
            });
            if (resultado.status === 200) {
                Swal.fire(
                    'Ingreso Editado',
                    'El ingreso se editó correctamente',
                    'success'
                )
                guardarEjecutar(true);
                history.push('/ingresos');
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error, vuelve a intentarlo'
            })
        }

    }

    return (
        <div className="col-md-8 mx-auto py-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Editar Ingreso</h1>
                <form
                    onSubmit={editarIngreso}
                    className="mt-5"
                >
                    <label>Descripción</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            placeholder="Descripción"
                            ref={descripcionRef}
                            defaultValue={ingreso.descripcion}
                        />
                    </div>
                    <label>Valor</label>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            name="precio"
                            placeholder="Valor"
                            ref={valorRef}
                            defaultValue={ingreso.valor}
                        />
                    </div>
                    <legend className="text-center">Tipo de ingreso:</legend>
                    <div className="text-center">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipo"
                                value="Fijo"
                                onChange={e => { guardarCategoria(e.target.value) }}
                                defaultChecked={(ingreso.tipo === "Fijo")}
                            />
                            <label className="form-check-label">
                                Fijo
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipo"
                                value="Extraordinario"
                                onChange={e => { guardarCategoria(e.target.value) }}
                                defaultChecked={(ingreso.tipo === "Extraordinario")}
                            />
                            <label className="form-check-label">
                                Extraordinario
                            </label>
                        </div>
                    </div>


                    <input type="submit"
                        className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                        value="Actualizar Ingreso"
                    />
                </form>
            </div>
        </div>
    );
}

export default withRouter(EditarIngreso);
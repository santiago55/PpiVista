import axios from 'axios';
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'

function EditarEgreso({ egreso, guardarEjecutar,history }) {
    const cookies = new Cookies();
    const descripcionRef = useRef('');
    const valorRef = useRef('');
    const categoriaRef = useRef('');
    const [tipo, guardarTipo] = useState('');

    const editarEgreso = async (e) => {
        e.preventDefault();
        const tipoFN = (tipo === '') ? egreso.tipo : tipo;
        if (descripcionRef === '' || valorRef === '' || categoriaRef === '') {
            return;
        }
        const headers = {
            "token":cookies.get('token')
        }
        try{
        const result = await axios.put(`https://ppibackend.vercel.app/egresos/${egreso._id}`,
            {
                descripcion: descripcionRef.current.value,
                valor: valorRef.current.value,
                categoria: categoriaRef.current.value,
                tipo: tipoFN
            },{"headers":headers});
            if (result.status === 200) {
                Swal.fire(
                    'Egreso Editado',
                    'El egreso se editó correctamente',
                    'success'
                )
                guardarEjecutar(true);
                history.push('/egresos');
            }
        }catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error, vuelve a intentarlo'
            })
        }

    }
    //console.log(egreso.categoria);
    return (
        <div className="col-md-8 mx-auto py-5">
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Editar Ingreso</h1>
                <form
                    onSubmit={editarEgreso}
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
                            defaultValue={egreso.descripcion}
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
                            defaultValue={egreso.valor}
                        />
                    </div>
                    <label>Categoria</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="categoria"
                            placeholder="Categoria"
                            ref={categoriaRef}
                            defaultValue={egreso.categoria}
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
                                onChange={e => { guardarTipo(e.target.value) }}
                                defaultChecked={(egreso.tipo === "Fijo")}
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
                                onChange={e => { guardarTipo(e.target.value) }}
                                defaultChecked={(egreso.tipo === "Extraordinario")}
                            />
                            <label className="form-check-label">
                                Extraordinario
                            </label>
                        </div>
                    </div>
                    <input type="submit"
                        className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                        value="Actualizar Egreso"
                    />
                </form>
            </div>
        </div>
    );
}

export default withRouter(EditarEgreso);
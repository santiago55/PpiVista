import React, {Fragment} from 'react'
import { Bar, defaults } from 'react-chartjs-2'
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const GraficaIngresos = ({ ingresos, tipo }) => {
    let tipos = tipo.map(tipos => tipos.tipo)
    let total = [];
    let contF = 0;
    let contE = 0;
    //const cantidadTipo = ingresos.map(ingreso => ingreso.tipo)
    // .filter((pos)=> pos.tipo === tipos)
    tipos.forEach(tipo => {
        let cantidadTipo = ingresos.filter(ingreso => ingreso.tipo === tipo)
        let prueba = cantidadTipo.map(cantidadtipo => cantidadtipo.tipo)
        prueba.forEach(pruebita => {
            if (pruebita === 'Fijo') {
                contF = contF + 1;
            }
            if (pruebita === 'Extraordinario') {
                contE = contE + 1;
            }
        })
    })

    total.push(contF, contE);
    let totaltotal = contF+contE;


    return (
        <Fragment>

        <div>
            <Bar
                data={{
                    labels: tipos,

                    datasets: [
                        {
                            label: `Cantidad Ingresos por tipo ${totaltotal}`,
                            data: total,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },

                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },
                }}
            />
        </div>
        </Fragment>
    )
}

export default GraficaIngresos

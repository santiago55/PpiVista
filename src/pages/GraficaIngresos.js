import { findAllByDisplayValue } from '@testing-library/dom';
import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import '../css/ingresos.css';
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'


const GraficaIngresos = ({ ingresos, tipo }) => {
    let tipos = tipo.map(tipos => tipos.tipo)
    let total = [];

    const contF = ingresos.filter(ingreso => ingreso.tipo === 'Fijo')
        .reduce((total, ingreso) => total += ingreso.valor, 0)
     

    const contE = ingresos.filter(ingreso => ingreso.tipo === 'Extraordinario')
        .reduce((total, ingreso) => total += ingreso.valor, 0)

    total.push(contF, contE);
    let totaltotal = contF + contE;

    return (


        <div>
            <Bar
                data={{
                    labels: tipos,

                    datasets: [
                        {
                          
                            data: total,
                            backgroundColor: [
                               'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                               'rgba(255, 99, 132, 1)',
                               'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1,

                            label: `Cantidad Ingresos por tipo ${totaltotal}`,
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
                                    beginAtZero: findAllByDisplayValue,
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
    )
}

export default GraficaIngresos

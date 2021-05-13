import { findAllByDisplayValue } from '@testing-library/dom';
import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import '../css/ingresos.css';
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'


const GraficaEgresos = ({ egresos, tipo , categoria}) => {
    let tipos = tipo.map(tipos => tipos.tipo)
    let total = [];

    const contF = egresos.filter(egresos => egresos.tipo === 'Fijo')
        .reduce((total, egresos) => total += egresos.valor, 0)
     

    const contE = egresos.filter(egresos => egresos.tipo === 'Extraordinario')
        .reduce((total, egresos) => total += egresos.valor, 0)

    total.push(contF, contE);
    let totaltotal = contF + contE;

    return (
        <div id="container" >
            <Bar
                data={{
                    labels: categoria,

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

                            label: `Cantidad Egresos por tipo ${totaltotal}`,
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

export default GraficaEgresos

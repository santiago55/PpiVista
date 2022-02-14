import { findAllByDisplayValue } from '@testing-library/dom';
import React from 'react'
import { Pie, defaults } from 'react-chartjs-2'
import '../css/ingresos.css';
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'


const GraficaEgresos = ({ egresos, tipo , categoria}) => {
    let categorias = categoria.map(categoria => categoria.categoria)
    let total = [];

    const contD = egresos.filter(egresos => egresos.categoria === 'Deudas')
        .reduce((total, egresos) => total += egresos.valor, 0)
     

    const contT = egresos.filter(egresos => egresos.categoria === 'Transporte')
        .reduce((total, egresos) => total += egresos.valor, 0)

    const contC = egresos.filter(egresos => egresos.categoria === 'Alimento')
        .reduce((total, egresos) => total += egresos.valor, 0)

    const contO = egresos.filter(egresos => egresos.categoria === 'Otros')
        .reduce((total, egresos) => total += egresos.valor, 0)

    total.push(contD, contT,contC,contO);
    let totaltotal = contD+ contT+contC+contO;

    let busca = egresos.filter(n => n.date > "2021-07-25" && n.date < "2021-07-25")
    console.log(busca)


    return (
        <div id="container" >
            <Pie
                data={{
                    labels: categorias,

                    datasets: [
                        {
                          
                            data: total,
                            backgroundColor: [
                               'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
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

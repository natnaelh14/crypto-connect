import React from 'react'
import { Line } from 'react-chartjs-2';

type GraphProps = {
    coinDates: Array<string>,
    coinPrices: Array<string>
}

const CoinGraph = ({ coinDates, coinPrices }: GraphProps) => {
    const data = {
        labels: coinDates,
        datasets: [
            {
                label: 'Past 30 days',
                data: coinPrices,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    const options = {
        scales: {
            x: {
                ticks: {
                    display: false
                }
            },
            y: {
                beginAtZero: false,
                precision: 5
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default CoinGraph;

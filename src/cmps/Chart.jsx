
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ToyChart({ labelCounts }) {
    console.log('labelsCount', labelCounts)
    const data = {
        labels: Object.keys(labelCounts),

        datasets: [
            {
                label: '# of Votes',
                data:
                    Object.values(labelCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 60, 64, 0.2)',
                    'rgba(130, 99, 64, 0.2)',
                    'rgba(255, 80, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 60, 64,1)',
                    'rgba(130, 99, 64, 1)',
                    'rgba(255, 80, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <Doughnut data={data} />;
}



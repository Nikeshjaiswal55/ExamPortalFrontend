import React,{useEffect,useRef} from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({chartLabels,chartData}) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if(chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
            new Chart(ctx,{
                type: 'bar',
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            label: 'Top Rank',
                            data: chartData,
                            backgroundColor: [
                                'rgb(76, 56, 224)',
                                'rgb(127,170,204)',
                                'rgb(107, 4, 130)',
                                'rgb(163, 70, 69)',
                                'rgb(220,140,103)',
                            ],
                            borderColor: [
                                'rgb(127,170,204)',
                                'rgb(64,113,244)',
                                'rrgb(107, 4, 130)',
                                'rgb(163, 70, 69)',
                                'rgb(220,140,103)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    },[]);

    return (
        <>
            <canvas ref={chartContainer} width="100%" height="100%"></canvas>
        </>
    );
};

export default BarChart;

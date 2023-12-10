import React,{useEffect,useRef} from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({DoughnutChartData,DoughnutChartLabels}) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if(chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');

            new Chart(ctx,{
                type: 'doughnut',
                data: {
                    labels: DoughnutChartLabels,
                    datasets: [
                        {
                            label: 'My First Dataset',
                            data: DoughnutChartData,
                            backgroundColor: [
                                'red',
                                'rgb(64,113,244)',
                                'green',
                                'yellow',
                                // 'skyblue',
                                'purple',
                            ],
                            borderColor: [
                                'red',
                                'rgb(64,113,244)',
                                'green',
                                'yellow',
                                // 'skyblue',
                                'purple',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
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

export default DoughnutChart;

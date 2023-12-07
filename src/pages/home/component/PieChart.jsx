import React,{useEffect,useRef} from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({PieChartData,PieChartLabels}) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if(chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');

            new Chart(ctx,{
                type: 'pie',
                data: {
                    labels: PieChartLabels,
                    datasets: [
                        {
                            label: 'My students',
                            data: PieChartData,
                            backgroundColor: [
                                'rgb(220,53,69)',
                                'rgb(64,113,244)',
                                'rgb(25,135,84)',
                                'rgb(255,193,7)',
                                // 'skyblue',
                                'purple',
                            ],
                            borderColor: [
                                'rgb(220,53,69)',
                                'rgb(64,113,244)',
                                'rgb(25,135,84)',
                                'rgb(255,193,7)',
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

export default PieChart;

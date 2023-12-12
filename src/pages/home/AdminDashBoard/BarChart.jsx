import React,{useRef,useLayoutEffect,useEffect} from 'react';
// import './BarChart.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function BarChart({assessemnt1,assessemnt2,assessemnt3,assessemnt4,assessemnt5,value1,value2,value3,value4,value5}) {
    const chartDiv = useRef(null);

    useLayoutEffect(() => {
        const root = am5.Root.new(chartDiv.current);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root,{
                panY: false,
                layout: root.verticalLayout
            })
        );

        const data = [{
            category: "Top Ranking Assessment",
            value1: value1,
            value2: value2,
            value3: value3,
            value4: value4,
            value5: value5
        }

        ];

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root,{
                renderer: am5xy.AxisRendererY.new(root,{})
            })
        );

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root,{
                renderer: am5xy.AxisRendererX.new(root,{}),
                categoryField: "category"
            })
        );
        xAxis.data.setAll(data);

        const series1 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: assessemnt1,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value1",
                categoryXField: "category"
            })
        );
        series1.data.setAll(data);

        const series2 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: assessemnt2,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                categoryXField: "category"
            })
        );
        series2.data.setAll(data);
        const series3 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: assessemnt3,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value3",
                categoryXField: "category"
            })
        );
        series3.data.setAll(data);

        const series4 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: assessemnt4,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value4",
                categoryXField: "category"
            })
        );
        series4.data.setAll(data);
        const series5 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: assessemnt5,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value5",
                categoryXField: "category"
            })
        );
        series5.data.setAll(data);

        const legend = chart.children.push(am5.Legend.new(root,{}));
        legend.data.setAll(chart.series.values);

        chart.set("cursor",am5xy.XYCursor.new(root,{}));

        return () => {
            root.dispose();
        };
    },[]);

    useEffect(() => {
        return () => {
            if(chartDiv.current) {
                chartDiv.current.innerHTML = '';
            }
        };
    },[]);

    return (
        <div ref={chartDiv} style={{width: "100%",height: "100%"}}></div>
    );
}

export default BarChart;

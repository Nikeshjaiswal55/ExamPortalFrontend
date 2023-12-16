import React,{useRef,useLayoutEffect,useEffect} from 'react';
// import './BarChart.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const BarChartStudentDashboard = ({studentData}) => {
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
            value1: studentData?.[0]?.percentage ?? 0,
            value2: studentData?.[1]?.percentage ?? 0,
            value3: studentData?.[2]?.percentage ?? 0,
            value4: studentData?.[3]?.percentage ?? 0,
            value5: studentData?.[4]?.percentage ?? 0,
            value6: studentData?.[5]?.percentage ?? 0,
            value7: studentData?.[6]?.percentage ?? 0,
            value8: studentData?.[7]?.percentage ?? 0,
            value9: studentData?.[8]?.percentage ?? 0,
            value10: studentData?.[9]?.percentage ?? 0,
            value11: studentData?.[10]?.percentage ?? 0,
            value12: studentData?.[11]?.percentage ?? 0,
            value13: studentData?.[12]?.percentage ?? 0,
            value14: studentData?.[13]?.percentage ?? 0,
            value15: studentData?.[14]?.percentage ?? 0,
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

        // studentData.forEach((value,index) => {
        const series1 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[0]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: `value1`,
                categoryXField: "category"
            })
        );
        series1.data.setAll(data);
        // });

        const series2 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[1]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value1",
                categoryXField: "category"
            })
        );
        series2.data.setAll(data);

        const series3 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[2]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                categoryXField: "category"
            })
        );
        series3.data.setAll(data);
        const series4 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[3]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value3",
                categoryXField: "category"
            })
        );
        series4.data.setAll(data);

        const series5 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[4]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value4",
                categoryXField: "category"
            })
        );
        series5.data.setAll(data);
        const series6 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[5]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value6",
                categoryXField: "category"
            })
        );
        series6.data.setAll(data);
        const series7 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[6]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value7",
                categoryXField: "category"
            })
        );
        series7.data.setAll(data);
        const series8 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[7]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value8",
                categoryXField: "category"
            })
        );
        series8.data.setAll(data);
        const series9 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[8]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value9",
                categoryXField: "category"
            })
        );
        series9.data.setAll(data);
        const series10 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[9]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value10",
                categoryXField: "category"
            })
        );
        series10.data.setAll(data);
        const series11 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[10]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value11",
                categoryXField: "category"
            })
        );
        series11.data.setAll(data);
        const series12 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[11]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value12",
                categoryXField: "category"
            })
        );
        series12.data.setAll(data);
        const series13 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[12]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value13",
                categoryXField: "category"
            })
        );
        series13.data.setAll(data);
        const series14 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[13]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value14",
                categoryXField: "category"
            })
        );
        series14.data.setAll(data);
        const series15 = chart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: studentData?.[14]?.assesment_Name ?? 'Not present',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value15",
                categoryXField: "category"
            })
        );
        series15.data.setAll(data);
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


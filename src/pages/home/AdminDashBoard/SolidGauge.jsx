import React,{useRef,useLayoutEffect,useEffect} from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5radar from '@amcharts/amcharts5/radar'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

function SolidGauge({assessemnt1,assessemnt2,assessemnt3,assessemnt4,assessemnt5,value1,value2,value3,value4,value5}) {
    const chartDiv = useRef(null);

    useLayoutEffect(() => {
        const root = am5.Root.new(chartDiv.current);

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5radar.RadarChart.new(root,{
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                innerRadius: am5.percent(20),
                startAngle: -90,
                endAngle: 180
            })
        );

        const data = [
            {
                category: assessemnt1,
                value: value1,
                full: 100,
                columnSettings: {fill: chart.get('colors').getIndex(0)}
            },
            {
                category: assessemnt2,
                value: value2,
                full: 100,
                columnSettings: {fill: chart.get('colors').getIndex(1)}
            },
            {
                category: assessemnt3,
                value: value3,
                full: 100,
                columnSettings: {fill: chart.get('colors').getIndex(2)}
            },
            {
                category: assessemnt4,
                value: value4,
                full: 100,
                columnSettings: {fill: chart.get('colors').getIndex(3)}
            }
        ];


        const cursor = chart.set('cursor',am5radar.RadarCursor.new(root,{behavior: 'zoomX'}));
        cursor.lineY.set('visible',false);

        const xRenderer = am5radar.AxisRendererCircular.new(root,{minGridDistance: 50});
        xRenderer.labels.template.setAll({radius: 10});
        xRenderer.grid.template.setAll({forceHidden: true});

        const xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root,{
                renderer: xRenderer,
                min: 0,
                max: 100,
                strictMinMax: true,
                numberFormat: "#'%'",
                tooltip: am5.Tooltip.new(root,{})
            })
        );

        const yRenderer = am5radar.AxisRendererRadial.new(root,{minGridDistance: 20});
        yRenderer.labels.template.setAll({centerX: am5.p100,fontWeight: '500',fontSize: 18,templateField: 'columnSettings'});
        yRenderer.grid.template.setAll({forceHidden: true});

        const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root,{
                categoryField: 'category',
                renderer: yRenderer
            })
        );
        yAxis.data.setAll(data);

        const series1 = chart.series.push(
            am5radar.RadarColumnSeries.new(root,{
                xAxis: xAxis,
                yAxis: yAxis,
                clustered: false,
                valueXField: 'full',
                categoryYField: 'category',
                fill: root.interfaceColors.get('alternativeBackground')
            })
        );
        series1.columns.template.setAll({width: am5.p100,fillOpacity: 0.08,strokeOpacity: 0,cornerRadius: 20});
        series1.data.setAll(data);

        const series2 = chart.series.push(
            am5radar.RadarColumnSeries.new(root,{
                xAxis: xAxis,
                yAxis: yAxis,
                clustered: false,
                valueXField: 'value',
                categoryYField: 'category'
            })
        );
        series2.columns.template.setAll({
            width: am5.p100,
            strokeOpacity: 0,
            tooltipText: '{category}: {valueX}%',
            cornerRadius: 20,
            templateField: 'columnSettings'
        });
        series2.data.setAll(data);

        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000,100);

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

    return <div id="chartdiv" ref={chartDiv} style={{width: '100%',height: '100%'}}></div>;
}

export default SolidGauge;

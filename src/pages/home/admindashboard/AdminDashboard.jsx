import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AdminDashboard = () => {
  useEffect(() => {
    let chart = null;

    const createChart = () => {
      const root = am5.Root.new("chartdiv");

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      }));

      const series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      }));

      series.data.setAll([
        { value: 10, category: "BBA" },
        { value: 100, category: "MBA" },
        { value: 100, category: "MCA" },
        { value: 1000, category: "BCA" },
        { value: 10, category: "BA" },
      ]);

      series.appear(1000, 100);
    };

    createChart();

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []);

  return (
    <div className="parent-container " style={{ width: '100%', height: '250px' }}>
      <div className="fs-6" id="chartdiv" style={{  width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default AdminDashboard;

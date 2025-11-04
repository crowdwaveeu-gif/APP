import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [
    {
      data: [
        {
          x: "New Delhi",
          y: 218,
        },
        {
          x: "Kolkata",
          y: 149,
        },
        {
          x: "Mumbai",
          y: 184,
        },
        {
          x: "Ahmedabad",
          y: 55,
        },
        {
          x: "Bangaluru",
          y: 84,
        },
        {
          x: "Pune",
          y: 31,
        },
        {
          x: "Chennai",
          y: 70,
        },
        {
          x: "Jaipur",
          y: 30,
        },
        {
          x: "Surat",
          y: 44,
        },
        {
          x: "Hyderabad",
          y: 68,
        },
        {
          x: "Lucknow",
          y: 28,
        },
        {
          x: "Indore",
          y: 19,
        },
        {
          x: "Kanpur",
          y: 29,
        },
      ],
    },
  ],
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: "treemap",
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 575,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
};
const TreemapChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, chartOptions);

    const initChart = () => {
      chart.render(); // Attempt to render with default options
    };

    initChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);
  return (
    <div className="col-lg-6">
      <div className="panel chart-panel-2">
        <div className="panel-header">
          <h5>Treemap Charts</h5>
        </div>
        <div className="panel-body">
          <div id="treemapChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default TreemapChart;

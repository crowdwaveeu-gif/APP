import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [44, 55, 13, 43],
  chart: {
    height: 350,
    type: "pie",
  },
  stroke: {
    width: 0,
  },
  labels: ["Team A", "Team B", "Team C", "Team D"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 300,
        },
      },
    },
  ],
  legend: {
    position: "bottom",
  },
  dataLabels: {
    dropShadow: {
      enabled: false,
    },
  },
};

const PieChart = () => {
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
      <div className="panel">
        <div className="panel-header">
          <h5>Pie Charts</h5>
        </div>
        <div className="panel-body">
          <div id="pieChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default PieChart;

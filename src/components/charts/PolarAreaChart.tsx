import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [23, 21, 17, 15, 10],
  chart: {
    type: "polarArea",
    height: 373,
  },
  stroke: {
    width: 0,
  },
  fill: {
    opacity: 0.8,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
  legend: {
    position: "bottom",
  },
};

const PolarAreaChart = () => {
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
          <h5>Polar Area Charts</h5>
        </div>
        <div className="panel-body">
          <div id="polarAreaChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default PolarAreaChart;

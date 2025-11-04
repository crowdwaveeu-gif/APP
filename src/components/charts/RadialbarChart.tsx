import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [44, 55, 67, 83],
  chart: {
    height: 343,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: "22px",
        },
        value: {
          fontSize: "16px",
        },
        total: {
          show: true,
          label: "Total",
          formatter: function () {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return 249;
          },
        },
      },
    },
  },
  labels: ["Apples", "Oranges", "Bananas", "Berries"],
};

const RadialbarChart = () => {
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
          <h5>Radial Bar Charts</h5>
        </div>
        <div className="panel-body">
          <div id="radialBarChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default RadialbarChart;

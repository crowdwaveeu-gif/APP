import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: "Series 2",
      data: [20, 30, 40, 80, 20, 80],
    },
    {
      name: "Series 3",
      data: [44, 76, 78, 13, 43, 10],
    },
  ],
  chart: {
    height: 350,
    type: "radar",
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 0.5,
  },
  fill: {
    opacity: 0.2,
  },
  markers: {
    size: 0,
  },
  xaxis: {
    categories: ["2011", "2012", "2013", "2014", "2015", "2016"],
  },
};

const RadarChart = () => {
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
          <h5>Radar Charts</h5>
        </div>
        <div className="panel-body pb-0">
          <div id="radarChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default RadarChart;

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [
    {
      type: "boxPlot",
      data: [
        {
          x: "Jan 2015",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Jan 2016",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Jan 2017",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Jan 2018",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Jan 2019",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Jan 2020",
          y: [41, 49, 58, 61, 67],
        },
        {
          x: "Jan 2021",
          y: [54, 59, 66, 71, 88],
        },
      ],
    },
  ],
  chart: {
    type: "boxPlot",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    colors: ["#334672"],
    width: 1,
  },
  grid: {
    borderColor: "#334652",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  plotOptions: {
    boxPlot: {
      colors: {
        upward: "#037fe0",
        downward: "#03c68a",
      },
    },
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
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

const BoxplotCharts = () => {
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
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Boxplot Charts</h5>
        </div>
        <div className="panel-body">
          <div id="boxplotChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default BoxplotCharts;

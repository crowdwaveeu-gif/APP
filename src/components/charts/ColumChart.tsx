import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  chart: {
    height: 350,
    type: "bar",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    borderColor: "#334652",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      bottom: 15,
    },
  },
  xaxis: {
    fill: "#FFFFFF",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    labels: {
      format: "dddd",
    },
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
const ColumChart = () => {
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
          <h5>Column charts</h5>
        </div>
        <div className="panel-body">
          <div id="columnChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default ColumChart;

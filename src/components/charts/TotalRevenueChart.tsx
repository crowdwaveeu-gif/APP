import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    height: 220,
    type: "line",
    fontFamily: "Poppins, sans-serif",
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: false,
      opacity: 0,
    },
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
  },
  stroke: {
    curve: "straight",
    show: !0,
    colors: ["#1B84FF"],
    width: 2,
  },
  labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
  series: [
    {
      name: "Revenue",
      data: [4.0, 6.5, 6.3, 5.75, 7.0, 7.78],
    },
  ],
  dataLabels: {
    enabled: false,
  },
  colors: ["#1B84FF"],
  grid: {
    borderColor: "rgba(0, 0, 0, 0.10)",
    strokeDashArray: 2,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    theme: "dark",
  },
  legend: {
    show: false,
  },
  xaxis: {
    crosshairs: {
      show: false,
    },
    labels: {
      offsetX: 0,
      offsetY: 0,
      style: {
        colors: "#848A9C",
        fontSize: "12px",
      },
    },
    tooltip: {
      enabled: !1,
    },
  },
  yaxis: {
    crosshairs: {
      show: true,
    },
    labels: {
      offsetX: 0,
      offsetY: 0,
      style: {
        colors: "#848A9C",
        fontSize: "12px",
      },
    },
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
};

const TotalRevenueChart = () => {
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
  return <div id="totalRevenueChart" ref={chartRef}></div>;
};
export default TotalRevenueChart;

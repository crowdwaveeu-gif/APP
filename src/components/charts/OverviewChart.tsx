import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    height: 250,
    type: "donut",
    fontFamily: "Poppins, sans-serif",
    fill: {
      type: "gradient",
    },
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
    sparkline: {
      enabled: false,
    },
    dropShadow: {
      enabled: false,
      opacity: 0.1,
      blur: 3,
      left: -2,
      top: 2,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "9px",
      fontWeight: 500,
    },
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    floating: false,
    fontSize: "14px",
    fontWeight: 500,
    color: "#737B8B",
    offsetX: 0,
    offsetY: 0,
    markers: {
      width: 8,
      height: 8,
      strokeWidth: 0,
      strokeColor: "#fff",
      radius: 50,
      offsetX: 0,
      offsetY: 0,
    },
  },
  colors: ["#1B84FF", "#7239EA", "#16C0A1", "#C01616"],
  series: [19, 70, 6, 5],
  labels: ["Precent", "Illness", "Absent", "Late"],
  responsive: [
    {
      breakpoint: 1199,
      options: {
        legend: {
          fontSize: "12px",
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 220,
        },
      },
    },
  ],
};
const OverviewChart = () => {
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
  return <div id="overviewCharts" ref={chartRef}></div>;
};
export default OverviewChart;

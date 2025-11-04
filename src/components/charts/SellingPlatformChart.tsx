import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    height: "300",
    type: "donut",
    fontFamily: "Poppins, sans-serif",
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: false,
    },
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "left",
    floating: false,
    fontSize: "12px",
    fontWeight: 500,
    color: "#737B8B",
    offsetX: 0,
    offsetY: 10,
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: "#fff",
      radius: 12,
      offsetX: -2,
      offsetY: 2,
    },
    itemMargin: {
      horizontal: 12,
      vertical: 12,
    },
  },
  colors: ["#339AF0", "#51CF66", "#FF922B", "#F3F3F4"],
  series: [35, 30, 20, 15],
  labels: [
    "Social Media(35%)",
    "Digital Ass(30%)",
    "Website(20%)",
    "OTHERS (15%)",
  ],
  stroke: {
    width: 0,
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
};
const SellingPlatformChart = () => {
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
  return <div className="mt-4" id="sellingPlatform" ref={chartRef}></div>;
};
export default SellingPlatformChart;

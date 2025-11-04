import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    height: 180,
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
    show: false,
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
          height: 160,
        },
      },
    },
  ],
};

const TotalExpenseChart = () => {
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
  return <div id="totalExpense" ref={chartRef}></div>;
};
export default TotalExpenseChart;

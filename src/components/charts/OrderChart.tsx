import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    type: "bar",
    height: 70,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: false,
    },
  },
  colors: ["#1B84FF"],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 2,
      borderRadiusApplication: "around",
      borderRadiusWhenStacked: "last",
      columnWidth: "30%",
      barHeight: "100%",
      distributed: false,
      rangeBarOverlap: true,
      rangeBarGroupRows: false,
      hideZeroBarsWhenGrouped: false,
      isDumbbell: false,
      isFunnel: false,
      isFunnel3d: true,
      colors: {
        backgroundBarColors: ["rgba(27, 132, 255, 0.10)"],
        backgroundBarOpacity: 1,
        backgroundBarRadius: 2,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: "Poppins, sans-serif",
    },
    marker: {
      show: false,
    },
    x: {
      show: false,
    },
  },
  series: [
    {
      name: "Order",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
  ],
};
const OrderChart = () => {
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
  return <div id="orderChart" ref={chartRef}></div>;
};
export default OrderChart;

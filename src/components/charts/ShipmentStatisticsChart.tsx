import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    height: 320,
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
    colors: ["#FF9F43", "#1A83FE"],
    width: 3,
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  series: [
    {
      name: "Shipment",
      data: [20, 50, 25, 90, 60, 70, 65, 80, 65],
    },
    {
      name: "Delivery",
      data: [15, 35, 18, 75, 54, 58, 55, 65, 50],
    },
  ],
  dataLabels: {
    enabled: false,
  },
  colors: ["#FF9F43", "#1A83FE"],
  grid: {
    borderColor: "rgba(115, 123, 139, 0.30)",
    strokeDashArray: 2,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  tooltip: {
    theme: "dark",
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
    fontSize: "12px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    offsetX: -40,
    offsetY: -9,
    labels: {
      colors: "#737B8B",
    },
    markers: {
      width: 11,
      height: 11,
      strokeWidth: 0,
      radius: 0,
    },
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
        fontSize: "14px",
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
const ShipmentStatisticsChart = () => {
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
  return <div id="shipmentStatistics" ref={chartRef}></div>;
};
export default ShipmentStatisticsChart;

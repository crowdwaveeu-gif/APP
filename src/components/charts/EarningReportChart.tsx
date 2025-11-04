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
    curve: "smooth",
    show: !0,
    colors: ["#1B84FF", "#848A9C"],
    width: 2,
  },
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  series: [
    {
      name: "Shipment",
      data: [120, 150, 100, 152, 78, 180, 150],
    },
    {
      name: "Delivery",
      data: [50, 50, 100, 112, 56, 130, 75],
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

const EarningReportChart = () => {
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
  return <div id="earningsReports" ref={chartRef}></div>;
};
export default EarningReportChart;

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [
    {
      name: "Direct login",
      type: "column",
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: "",
      type: "column",
      data: [null, null, null, null, null, null],
    },
    {
      name: "Links to sites",
      type: "column",
      data: [34, 45, 31, 57, 17, 33, 16],
    },
    {
      name: "",
      type: "column",
      data: [null, null, null, null, null, null],
    },
    {
      name: "Direct login",
      type: "column",
      data: [24, 35, 21, 47, 12, 23, 11],
    },
    {
      name: "Direct login",
      type: "line",
      data: [35, 45, 31, 77, 16, 23, 18],
    },
  ],
  chart: {
    height: 250,
    type: "line",
    stacked: false,
    fontFamily: "Poppins, sans-serif",
    toolbar: {
      show: false,
    },
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
    dashArray: 0,
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      columnWidth: "30%",
    },
  },
  colors: ["#1B84FF", "#FFA84A", "#FF392B", "#FFA84A"],
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  markers: {
    size: 0,
  },
  xaxis: {
    lines: {
      show: false,
    },
    labels: {
      show: true,
      style: {
        colors: "#737B8B",
        fontSize: "14px",
        fontWeight: 500,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      align: "right",
      style: {
        colors: "#737B8B",
        fontSize: "14px",
        fontWeight: 500,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "left",
    showForNullSeries: false,
    showForZeroSeries: false,
    offsetY: 0,
    fontSize: "12px",
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 6,
      offsetX: 2,
      offsetY: 2,
    },
  },
  tooltip: {
    theme: "dark",
    shared: true,
    intersect: false,
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  responsive: [
    {
      breakpoint: 575,
      options: {
        chart: {
          height: 240,
        },
      },
    },
  ],
};
const ShipmentStatisticsChart2 = () => {
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
  return <div id="shipmentStatisticChart" ref={chartRef}></div>;
};
export default ShipmentStatisticsChart2;

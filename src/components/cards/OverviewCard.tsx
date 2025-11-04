import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const chartOptions = {
  chart: {
    height: 340,
    type: "bar",
    fontFamily: "Poppins, sans-serif",
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
    dropShadow: {
      enabled: false,
    },
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: !1,
      borderRadius: 6,
      columnWidth: "80%",
      endingShape: "rounded",
    },
  },
  colors: "rgba(27, 132, 255, 0.10)",
  dataLabels: {
    enabled: !1,
  },
  grid: {
    show: false,
  },
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  legend: {
    show: false,
  },
  tooltip: {
    theme: "dark",
    marker: {
      show: false,
    },
    x: {
      show: !1,
    },
  },
  stroke: {
    show: !0,
    colors: ["transparent"],
    width: 3,
  },
  series: [
    {
      name: "",
      data: [
        6000, 4600, 4200, 3800, 4500, 4300, 3800, 4900, 4600, 1700, 4800, 5100,
      ],
    },
  ],
  xaxis: {
    labels: {
      style: {
        colors: "#737B8B",
        fontSize: "14px",
      },
    },
  },
  yaxis: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 230,
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
      },
    },
  ],
};
const OverviewCard = () => {
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
    <div className="card-three pb-0 bg-white full-height">
      <div className="card-header-three">
        <div className="card-header-three-title">
          <h3>Overview</h3>
          <p>Monthly Earning</p>
        </div>
        <select className="webdesh-select right overview-select">
          <option value="1">Weekly</option>
          <option value="2">Monthly</option>
          <option value="3">Yearly</option>
        </select>
      </div>
      <div className="chart-area">
        <div id="overview" ref={chartRef}></div>
      </div>
    </div>
  );
};
export default OverviewCard;

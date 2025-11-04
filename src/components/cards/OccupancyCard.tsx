import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const chartOptions = {
  chart: {
    height: 270,
    type: "bar",
    fontFamily: "Poppins, sans-serif",
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
    dropShadow: {
      enabled: !0,
      opacity: 0,
      blur: 0,
      left: -1,
      top: 5,
    },
    zoom: {
      enabled: !1,
    },
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 1,
      columnWidth: "40%",
    },
  },
  colors: ["#008FFB"],
  dataLabels: {
    enabled: !1,
  },
  grid: {
    borderColor: "rgba(0, 0, 0, 0.14)",
    strokeDashArray: 4,
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
  labels: [
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
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
  series: [
    {
      name: "Percent",
      data: [77, 55, 72, 46, 85, 80, 79, 83, 90, 92],
    },
  ],
  xaxis: {
    crosshairs: {
      show: false,
    },
    labels: {
      offsetX: 0,
      offsetY: 0,
      style: {
        colors: "#737B8B",
        fontSize: "12px",
      },
    },
    tooltip: {
      enabled: !1,
    },
  },
  yaxis: {
    labels: {
      offsetX: -10,
      offsetY: 0,
      style: {
        colors: "#737B8B",
        fontSize: "12px",
      },
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
    },
  ],
};

const OccupancyCard = () => {
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
    <div className="card-2 pb-0 bg-white full-height">
      <div className="card-header-three mb-3">
        <div className="card-header-three-title">
          <h3 className="mb-3">Occupancy Statistics</h3>
        </div>
        <select className="mb-3 webdesh-select right occupancy-statistics-select">
          <option value="1">Weekly</option>
          <option value="2">Monthly</option>
          <option value="3">Yearly</option>
        </select>
      </div>

      <div className="chart-area occupancy-statistics">
        <div id="occupancyStatistics" ref={chartRef}></div>
      </div>
    </div>
  );
};
export default OccupancyCard;

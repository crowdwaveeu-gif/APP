import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const chartOptions = {
  chart: {
    ntFamily: "Poppins, sans-serif",
    type: "bar",
    height: 570,
    stacked: true,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "60%",
      borderRadius: 8,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Job View",
      data: [110, 42, 57, 86, 58, 55, 70, 34, 80, 90, 88],
    },
    {
      name: "Job Applied",
      data: [20, 15, 19, 20, 19, 16, 21, 20, 19, 18, 19],
    },
  ],
  colors: ["#0FD354", "#D9F3E2"],
  grid: {
    borderColor: "#EDEFF5",
    strokeDashArray: 3,
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
  legend: {
    position: "top",
    horizontalAlign: "center",
    offsetY: -40,
    offsetX: 150,
    fontSize: "14px",
    fontWeight: 600,
    markers: {
      width: 16,
      height: 16,
      strokeWidth: 0,
    },
    itemMargin: {
      horizontal: 0,
      vertical: 0,
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#737B8B",
        fontSize: "14px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#737B8B",
        fontSize: "14px",
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return "Status " + val + " K";
      },
    },
  },
  responsive: [
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 300,
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            borderRadius: 4,
          },
        },
        legend: {
          horizontalAlign: "right",
          offsetY: 0,
          offsetX: 0,
          fontSize: "12px",
          markers: {
            width: 12,
            height: 12,
          },
        },
      },
    },
  ],
};

const JobStatisticCard = () => {
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
    <div className="card full-height bg-white">
      <div className="chart-area">
        <div className="card-header-area mb-0 d-flex flex-wrap align-items-center justify-content-between">
          <h3 className="card-title mb-3">Job Statistics</h3>
          <div>
            <select className="mb-3 webdesh-select right job-statistics-select">
              <option value="1">Weekly</option>
              <option value="2">Monthly</option>
              <option value="3">Yearly</option>
            </select>
          </div>
        </div>

        <div id="tickets_status" ref={chartRef}></div>
      </div>
    </div>
  );
};
export default JobStatisticCard;

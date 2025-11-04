import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const chartOptions = {
  chart: {
    height: 350,
    type: "area",
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
  fill: {
    opacity: 0,
    type: "solid",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0,
      opacityTo: 0,
      stops: [0, 50, 100],
      colorStops: [],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
    show: !0,
    colors: ["#1B84FF", "#DEE4E8"],
  },
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  series: [
    {
      name: "",
      data: [34, 40, 28, 52, 42, 109, 100],
    },
    {
      name: "",
      data: [32, 60, 34, 46, 34, 52, 41],
    },
  ],
  dataLabels: {
    enabled: false,
  },
  colors: ["#1B84FF", "#DEE4E8"],
  grid: {
    borderColor: "rgba(115, 123, 139, 0.30)",
    strokeDashArray: 2,
  },
  tooltip: {
    theme: "dark",
  },
  legend: {
    show: false,
  },
  xaxis: {
    crosshairs: {
      show: !0,
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
    labels: {
      formatter: function (e: number) {
        return e / 1e3 + "K";
      },
      offsetX: -14,
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
        plotOptions: {
          bar: {
            columnWidth: "70%",
          },
        },
      },
    },
  ],
};

const TransactionCard = () => {
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
    <div className="card-five bg-white full-height">
      <div className="card-header-area flex-wrap mb-0">
        <h3 className="card-title mb-3">Transaction Statistics</h3>
        <div>
          <select className="mb-3 webdesh-select right transaction-statistics-select">
            <option value="1">Weekly</option>
            <option value="2">Monthly</option>
            <option value="3" disabled>
              Yearly
            </option>
          </select>
        </div>
      </div>
      <div className="tra-chart-area">
        <div id="transactionStatistics" ref={chartRef}></div>
      </div>
    </div>
  );
};
export default TransactionCard;

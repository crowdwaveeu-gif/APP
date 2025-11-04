import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  chart: {
    height: 280,
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
      enabled: true,
      opacity: 0.1,
      blur: 3,
      left: -2,
      top: 2,
    },
  },
  legend: {
    show: true,
    position: "right",
    horizontalAlign: "center",
    floating: false,
    fontSize: "12px",
    fontWeight: 400,
    color: "#737B8B",
    offsetX: -30,
    offsetY: 10,
    markers: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      strokeColor: "#fff",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
    },
  },
  colors: ["#2C28F8", "#FFCF26", "#F8285A", "#17C653"],
  series: [35, 15, 20, 20],
  labels: ["Total work", "Total Job", "Job Done", "Total Job"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 250,
        },
        legend: {
          horizontalAlign: "center",
        },
      },
    },
  ],
};

const VisitorAnalyticsCard = () => {
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
    <div className="card-2 pb-xl-0 bg-white full-height">
      <div className="card-header-three flex-wrap">
        <div className="card-header-three-title">
          <h3 className="mb-3">Visitors Analytics</h3>
        </div>
        <select className="mb-3 webdesh-select right occupancy-statistics-select">
          <option value="1">Weekly</option>
          <option value="2">Monthly</option>
          <option value="3">Yearly</option>
        </select>
      </div>

      <div className="chart-area mt-4">
        <div id="catagorydonutChart" ref={chartRef}></div>
        <div className="py-3"></div>
      </div>
    </div>
  );
};
export default VisitorAnalyticsCard;

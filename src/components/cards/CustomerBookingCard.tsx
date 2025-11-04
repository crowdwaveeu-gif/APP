import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const chartOptions = {
  chart: {
    height: 350,
    type: "bar",
    fontFamily: "Poppins, sans-serif",
    animations: {
      enabled: !0,
      easing: "easeinout",
      speed: 1e3,
    },
    dropShadow: {
      enabled: !0,
      opacity: 0.02,
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
      horizontal: !1,
      borderRadius: 0,
      columnWidth: "60%",
      endingShape: "rounded",
    },
  },
  colors: ["#3452FF", "#E7E9EE"],
  dataLabels: {
    enabled: !1,
  },
  grid: {
    borderColor: "#f3f3f4",
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: !0,
      },
    },
    yaxis: {
      lines: {
        show: !1,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  legend: {
    position: "top",
    horizontalAlign: "right",
    offsetY: -20,
    fontSize: "14px",
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
  tooltip: {
    theme: "dark",
    marker: {
      show: !0,
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
      name: "arrival",
      data: [6000, 4600, 4200, 3800, 4500, 4300, 3800],
    },
    {
      name: "spending",
      data: [4900, 4800, 3900, 3600, 3850, 3700, 3800],
    },
  ],
  xaxis: {
    crosshairs: {
      show: !0,
    },
    labels: {
      offsetX: 0,
      offsetY: 0,
      style: {
        colors: "#8380ae",
        fontSize: "12px",
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
      offsetX: -10,
      offsetY: 0,
      style: {
        colors: "#8380ae",
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
        legend: {
          position: "top",
          horizontalAlign: "right",
          offsetY: 10,
          fontSize: "12px",
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
          },
        },
      },
    },
  ],
};

const CustomerBookingCard = () => {
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
    <div className="card-five bg-white box-card full-height">
      <div className="customer-chart-area">
        <div className="chart-header d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
          >
            <path
              d="M8.58222 19.4414C4.29111 19.4414 0 16.7414 0 11.4414C0 9.74142 0.643667 7.44142 1.28733 5.74142C1.41782 5.39679 1.78813 5.14142 2.14556 5.14142C2.61309 5.14142 2.94895 5.43921 3.11106 5.74142C3.32561 6.34142 3.54017 6.94142 3.75472 7.44142C4.14038 8.40008 4.61295 8.94142 5.36389 9.44142C4.91762 8.08493 4.92324 6.8106 5.36389 5.44142C6.32939 2.44142 8.04583 0.941422 9.33317 0.141421L9.54772 0.0414213C9.76228 -0.0585787 10.0841 0.0414215 10.2987 0.141421C10.5132 0.241421 10.7278 0.541421 10.7278 0.941421C10.7278 1.94141 11.3459 4.01763 12.8733 5.44141C14.8564 7.04142 17.1644 9.04142 17.1644 12.4414C17.1644 16.3414 13.3024 19.4414 8.58222 19.4414ZM2.25283 7.94142C1.82372 9.34142 1.60917 10.5414 1.60917 11.4414C1.60917 15.9414 5.25661 17.9414 8.58222 17.9414C12.4442 17.9414 15.5553 15.4414 15.5553 12.4414C15.5553 8.44141 11.8006 7.44141 10.1914 4.44141C9.65187 3.59085 9.57316 2.9854 9.33317 1.94142C8.47495 2.74142 7.50945 3.94141 6.97306 5.74142C6.55639 6.90662 6.63994 8.04142 6.86578 8.94142C7.08033 9.54142 6.86578 10.1414 6.43667 10.5414C5.90028 10.9414 5.25661 11.0414 4.61295 10.7414C3.21833 9.94141 2.68194 8.94141 2.25283 7.94142Z"
              fill="black"
            />
          </svg>
          <h6 className="mb-0 ms-2">Customer Booking</h6>
        </div>
        <div id="OrderStatistics" ref={chartRef}></div>
      </div>
    </div>
  );
};
export default CustomerBookingCard;

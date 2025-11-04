import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const chartOptions = {
  series: [
    {
      data: [
        {
          x: "Code",
          y: [
            new Date("2019-03-01").getTime(),
            new Date("2019-03-04").getTime(),
          ],
        },
        {
          x: "Test",
          y: [
            new Date("2019-03-04").getTime(),
            new Date("2019-03-08").getTime(),
          ],
        },
        {
          x: "Validation",
          y: [
            new Date("2019-03-08").getTime(),
            new Date("2019-03-12").getTime(),
          ],
        },
        {
          x: "Deployment",
          y: [
            new Date("2019-03-12").getTime(),
            new Date("2019-03-18").getTime(),
          ],
        },
      ],
    },
    {
      data: [
        {
          x: "Code",
          y: [
            new Date("2019-03-02").getTime(),
            new Date("2019-03-06").getTime(),
          ],
        },
        {
          x: "Test",
          y: [
            new Date("2019-03-05").getTime(),
            new Date("2019-03-09").getTime(),
          ],
        },
        {
          x: "Validation",
          y: [
            new Date("2019-03-11").getTime(),
            new Date("2019-03-15").getTime(),
          ],
        },
        {
          x: "Deployment",
          y: [
            new Date("2019-03-16").getTime(),
            new Date("2019-03-22").getTime(),
          ],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: "rangeBar",
    toolbar: {
      show: false,
    },
  },
  grid: {
    borderColor: "#334652",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      bottom: 15,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 575,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
};
const TimelineChart = () => {
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
    <div className="col-lg-6">
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Timeline Charts</h5>
        </div>
        <div className="panel-body">
          <div id="timelineChart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};
export default TimelineChart;

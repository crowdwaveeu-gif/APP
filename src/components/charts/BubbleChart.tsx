import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

function generateData(_: number, t: number, a: { min: number; max: number }) {
  const n: [number, number, number][] = [];
  for (let r = 0; r < t; r++) {
    const o = Math.floor(750 * Math.random()) + 1,
      l = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min,
      m = Math.floor(61 * Math.random()) + 15;
    n.push([o, l, m]);
  }
  return n;
}

const chartOptions: ApexCharts.ApexOptions = {
  series: [
    {
      name: "Product1",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Product2",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Product3",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Product4",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ],
  chart: {
    height: 350,
    type: "bubble",
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
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
  },
  xaxis: {
    tickAmount: 12,
    type: "category",
    labels: {
      rotate: 0,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    max: 70,
  },
  theme: {
    palette: "palette10",
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

const BubbleChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="col-lg-6">
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Bubble Charts</h5>
        </div>
        <div className="panel-body">
          <div ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};

export default BubbleChart;

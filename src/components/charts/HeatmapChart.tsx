import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface DataPoint {
  x: string;
  y: number;
}

function generateData2(
  count: number,
  yrange: { min: number; max: number }
): DataPoint[] {
  const series: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    const x = (i + 1).toString();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({ x, y });
  }
  return series;
}

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    height: 350,
    type: "heatmap",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 0,
  },
  colors: ["#037fe0", "#03c68a"],
  grid: {
    borderColor: "#334652",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 1,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  series: [
    { name: "Jan", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "Feb", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "Mar", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "Apr", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "", data: generateData2(20, { min: 0, max: 0 }) },
    { name: "May", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "Jun", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "Jul", data: generateData2(20, { min: -30, max: 55 }) },
    { name: "Aug", data: generateData2(20, { min: -30, max: 55 }) },
  ],
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      if (w.globals.seriesNames[seriesIndex] !== "") {
        return series[seriesIndex].data[dataPointIndex].y;
      } else {
        return "";
      }
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

const HeatmapChart: React.FC = () => {
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
          <h5>Heatmap Charts</h5>
        </div>
        <div className="panel-body">
          <div ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;

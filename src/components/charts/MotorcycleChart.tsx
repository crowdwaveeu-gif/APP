import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTransportModeStats } from "../../hooks";

interface MotorcycleChartProps {
  dataSource: 'trips' | 'packages';
}

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
      borderRadius: 4,
      columnWidth: "50%",
      endingShape: "rounded",
    },
  },
  colors: ["#9B59B6"],
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#B6B6B6",
    strokeDashArray: 2,
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    labels: {
      style: {
        colors: "#737B8B",
        fontSize: "14px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#737B8B",
        fontSize: "14px",
      },
      formatter: (val: number) => {
        if (val >= 1000) {
          return (val / 1000).toFixed(1) + "K";
        }
        return Math.round(val).toString();
      },
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 250,
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

const MotorcycleChart: React.FC<MotorcycleChartProps> = ({ dataSource }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ApexCharts | null>(null);
  const { data: transportStats, loading } = useTransportModeStats(dataSource);

  useEffect(() => {
    if (!chartRef.current || loading || !transportStats) return;

    const updatedOptions = {
      ...chartOptions,
      labels: transportStats.labels,
      series: [
        {
          name: "Motorcycle",
          data: transportStats.motorcycle,
        },
      ],
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.updateOptions(updatedOptions, true, true);
    } else {
      chartInstanceRef.current = new ApexCharts(chartRef.current, updatedOptions);
      chartInstanceRef.current.render();
    }
  }, [loading, transportStats]);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '270px' }}>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!transportStats || !transportStats.motorcycle || transportStats.motorcycle.every(val => val === 0)) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '270px' }}>
        <p className="text-muted">No motorcycle data available</p>
      </div>
    );
  }

  return <div id="motorcycleChart" ref={chartRef}></div>;
};

export default MotorcycleChart;

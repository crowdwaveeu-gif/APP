import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTransportModeStats } from "../../hooks";

interface PlaneChartProps {
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
  colors: ["#FFD338"],
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
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
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
      name: "Ship",
      data: [30000, 18000, 43000, 70000, 13000, 37000, 23000],
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
        fontSize: "14px",
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
        fontSize: "14px",
      },
      formatter: (val: number) => {
        // Show actual count for small numbers, K suffix for large numbers
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
const PlaneChart: React.FC<PlaneChartProps> = ({ dataSource }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ApexCharts | null>(null);
  const { data: transportStats, loading } = useTransportModeStats(dataSource);

  useEffect(() => {
    if (!chartRef.current || loading || !transportStats) return;

    console.log('📊 PlaneChart data:', {
      dataSource,
      flight: transportStats.flight,
      labels: transportStats.labels
    });

    // Update chart options with real data
    const updatedOptions = {
      ...chartOptions,
      labels: transportStats.labels,
      series: [
        {
          name: "Flight",
          data: transportStats.flight,
        },
      ],
    };

    // If chart already exists, update it instead of recreating
    if (chartInstanceRef.current) {
      chartInstanceRef.current.updateOptions(updatedOptions, true, true);
    } else {
      // Create new chart instance
      chartInstanceRef.current = new ApexCharts(chartRef.current, updatedOptions);
      chartInstanceRef.current.render();
    }
  }, [loading, transportStats, dataSource]);

  // Cleanup on unmount only
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
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Check if there's any data
  const hasData = transportStats && transportStats.flight.some(val => val > 0);
  
  return (
    <div style={{ position: 'relative' }}>
      <div id="planeCharts" ref={chartRef}></div>
      {!hasData && !loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#737B8B',
          fontSize: '14px'
        }}>
          No flight data available for the selected period
        </div>
      )}
    </div>
  );
};
export default PlaneChart;

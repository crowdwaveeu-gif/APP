import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTransportModeStats } from "../../hooks";

interface TransportModeComparativeChartProps {
  dataSource: 'trips' | 'packages';
}

const TransportModeComparativeChart = ({ dataSource }: TransportModeComparativeChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ApexCharts | null>(null);
  const { data, loading, error } = useTransportModeStats(dataSource);

  useEffect(() => {
    if (!chartRef.current || loading || error || !data) return;

    // Destroy existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Prepare series data based on data source
    const series = dataSource === 'trips' ? [
      {
        name: "Flight ✈️",
        data: data.flight || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Train 🚆",
        data: data.train || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Bus 🚌",
        data: data.bus || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Car 🚗",
        data: data.car || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Motorcycle 🏍️",
        data: data.motorcycle || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Ship 🚢",
        data: data.ship || [0, 0, 0, 0, 0, 0, 0],
      },
    ] : [
      {
        name: "Flight ✈️",
        data: data.flight || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Train 🚆",
        data: data.train || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Bus 🚌",
        data: data.bus || [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Car 🚗",
        data: data.car || [0, 0, 0, 0, 0, 0, 0],
      },
    ];

    const chartOptions: ApexCharts.ApexOptions = {
      chart: {
        height: 380,
        type: "bar",
        fontFamily: "Poppins, sans-serif",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 6,
          columnWidth: "70%",
          dataLabels: {
            position: "top",
          },
        },
      },
      colors: [
        "#3B82F6", // Flight - Blue
        "#10B981", // Train - Green
        "#F59E0B", // Bus - Amber
        "#EF4444", // Car - Red
        "#8B5CF6", // Motorcycle - Purple
        "#06B6D4", // Ship - Cyan
      ],
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "11px",
          colors: ["#304758"],
          fontWeight: 600,
        },
        formatter: function (val: number) {
          return val > 0 ? val.toString() : "";
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      grid: {
        borderColor: "#E5E7EB",
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
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10,
        },
      },
      xaxis: {
        categories: data.labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "13px",
            fontWeight: 500,
          },
        },
        axisBorder: {
          show: true,
          color: "#E5E7EB",
        },
        axisTicks: {
          show: true,
          color: "#E5E7EB",
        },
      },
      yaxis: {
        title: {
          text: dataSource === 'trips' ? "Number of Trips" : "Number of Packages",
          style: {
            color: "#6B7280",
            fontSize: "13px",
            fontWeight: 600,
          },
        },
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "13px",
          },
          formatter: function (val: number) {
            return Math.floor(val).toString();
          },
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        floating: false,
        fontSize: "13px",
        fontWeight: 500,
        offsetY: 0,
        markers: {
          width: 12,
          height: 12,
          radius: 3,
        },
        itemMargin: {
          horizontal: 12,
          vertical: 5,
        },
      },
      tooltip: {
        theme: "light",
        shared: true,
        intersect: false,
        y: {
          formatter: function (val: number) {
            return val + (dataSource === 'trips' ? " trips" : " packages");
          },
        },
        style: {
          fontSize: "13px",
        },
      },
      series: series,
    };

    // Create new chart instance
    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();
    chartInstanceRef.current = chart;

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, loading, error, dataSource]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "380px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading chart data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning m-3" role="alert">
        <strong>⚠️ Unable to load chart data:</strong> {error}
        <br />
        <small className="text-muted">Please check your Firebase connection and try again.</small>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 px-3">
        <p className="text-muted mb-2" style={{ fontSize: "13px" }}>
          <strong>📊 Comparative Analysis:</strong> This chart shows the distribution of transport modes 
          {dataSource === 'trips' 
            ? " used by travelers over the last 7 months. Longer bars indicate more trips using that mode." 
            : " preferred by package senders over the last 7 months. Longer bars indicate more packages requesting that mode."}
        </p>
        {dataSource === 'packages' && (
          <p className="text-info mb-0" style={{ fontSize: "12px" }}>
            <strong>ℹ️ Note:</strong> Packages can select multiple preferred transport modes. 
            Ship and Motorcycle options are not available for packages.
          </p>
        )}
      </div>
      <div ref={chartRef} id={`transport-comparative-chart-${dataSource}`}></div>
      
      {/* Summary Stats */}
      {data && (
        <div className="row g-3 mt-2 px-3">
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body py-2">
                <h6 className="mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
                  📈 Quick Summary
                </h6>
                <div className="row g-2">
                  {dataSource === 'trips' ? (
                    <>
                      <div className="col-6 col-md-4 col-lg-2">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Flight ✈️</small>
                          <strong style={{ fontSize: "14px", color: "#3B82F6" }}>
                            {data.flight?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-2">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Train 🚆</small>
                          <strong style={{ fontSize: "14px", color: "#10B981" }}>
                            {data.train?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-2">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Bus 🚌</small>
                          <strong style={{ fontSize: "14px", color: "#F59E0B" }}>
                            {data.bus?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-2">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Car 🚗</small>
                          <strong style={{ fontSize: "14px", color: "#EF4444" }}>
                            {data.car?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-2">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Motorcycle 🏍️</small>
                          <strong style={{ fontSize: "14px", color: "#8B5CF6" }}>
                            {data.motorcycle?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-2">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Ship 🚢</small>
                          <strong style={{ fontSize: "14px", color: "#06B6D4" }}>
                            {data.ship?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-6 col-md-3">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Flight ✈️</small>
                          <strong style={{ fontSize: "14px", color: "#3B82F6" }}>
                            {data.flight?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Train 🚆</small>
                          <strong style={{ fontSize: "14px", color: "#10B981" }}>
                            {data.train?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Bus 🚌</small>
                          <strong style={{ fontSize: "14px", color: "#F59E0B" }}>
                            {data.bus?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="text-center">
                          <small className="text-muted d-block" style={{ fontSize: "11px" }}>Car 🚗</small>
                          <strong style={{ fontSize: "14px", color: "#EF4444" }}>
                            {data.car?.reduce((a, b) => a + b, 0) || 0}
                          </strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportModeComparativeChart;

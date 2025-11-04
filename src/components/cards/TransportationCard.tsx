import { useState } from "react";
import TransportModeComparativeChart from "../charts/TransportModeComparativeChart";

const TransportationCard = () => {
  const [dataSource, setDataSource] = useState<"packages" | "trips">("trips");

  const toggleDataSource = (source: "packages" | "trips") => {
    setDataSource(source);
  };

  return (
    <div className="card full-height">
      <div className="shipment-data-chart">
        {/* Header with Data Source Toggle */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3">
          <div>
            <h6 className="mb-1">🚀 Transport Mode Statistics</h6>
            <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
              Comparative analysis of all transport modes
            </p>
          </div>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${dataSource === "trips" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => toggleDataSource("trips")}
              title="View transport modes used by travelers"
            >
              <span style={{ fontSize: "16px" }}>🗺️</span> Trips
            </button>
            <button
              type="button"
              className={`btn btn-sm ${dataSource === "packages" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => toggleDataSource("packages")}
              title="View transport modes preferred by package senders"
            >
              <span style={{ fontSize: "16px" }}>📦</span> Packages
            </button>
          </div>
        </div>

        {/* Comparative Chart - Shows all modes in one view */}
        <div className="comparative-chart-container">
          <TransportModeComparativeChart dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
};
export default TransportationCard;

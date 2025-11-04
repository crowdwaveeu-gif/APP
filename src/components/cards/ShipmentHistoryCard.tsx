import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getShipmentsByStatus, ShipmentData } from "../../services/dataService";
import { ShipmentHistoryTabpane } from "../shipment";

const ShipmentHistoryCard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("notable");
  const [shipments, setShipments] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCount, setActiveCount] = useState<number>(0);

  // Fetch shipments when tab changes
  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        const data = await getShipmentsByStatus(activeTab as 'notable' | 'delivered' | 'shipping');
        setShipments(data);
        
        // Calculate active shipments count (notable tab)
        if (activeTab === 'notable') {
          setActiveCount(data.length);
        }
      } catch (error) {
        console.error('Error fetching shipments:', error);
        setShipments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [activeTab]);

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleViewAll = () => {
    navigate('/packages'); // Navigate to packages/shipments page
  };

  return (
    <div className="card">
      <div className="mb-4 gap-2 card-header-content d-flex align-items-center justify-content-between flex-wrap">
        <div className="me-4">
          <h6 className="mb-1">Shipment History</h6>
          <p className="mb-0">{activeCount} Active Shipments</p>
        </div>
        <button className="btn btn-lean" onClick={handleViewAll}>View All</button>
      </div>

      <div className="shipping-history-tab">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "notable" ? "active" : ""}`}
              onClick={() => toggleTab("notable")}
            >
              In Transit
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "delivered" ? "active" : ""
              }`}
              onClick={() => toggleTab("delivered")}
            >
              Delivered
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "shipping" ? "active" : ""}`}
              onClick={() => toggleTab("shipping")}
            >
              Pending
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className={`ar-tab-pane ${activeTab === "notable" ? "active" : ""}`}
          >
            <ShipmentHistoryTabpane shipments={shipments} loading={loading} />
          </div>

          <div
            className={`ar-tab-pane ${
              activeTab === "delivered" ? "active" : ""
            }`}
          >
            <ShipmentHistoryTabpane shipments={shipments} loading={loading} />
          </div>

          <div
            className={`ar-tab-pane ${
              activeTab === "shipping" ? "active" : ""
            }`}
          >
            <ShipmentHistoryTabpane shipments={shipments} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShipmentHistoryCard;

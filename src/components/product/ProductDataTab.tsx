import { useState } from "react";

import InventoryPane from "./tab-panes/InventoryPane";
import PricePane from "./tab-panes/PricePane";
import AttributePane from "./tab-panes/AttributePane";
import ShippingInfoPane from "./tab-panes/ShippingInfoPane";
import VideoPane from "./tab-panes/VideoPane";
import ShippingConfigPane from "./tab-panes/ShippingConfigPane";
import OfferPane from "./tab-panes/OfferPane";
import MediaPane from "./tab-panes/MediaPane";

const ProductDataTab = () => {
  const [activeTab, setActiveTab] = useState("media");

  const handleTabChange = (tab: string | null) => {
    if (tab) {
      setActiveTab(tab);
    }
  };
  return (
    <nav>
      <div className="btn-box d-flex flex-wrap gap-1 mb-4">
        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "media" ? "active" : ""
          }`}
          onClick={() => handleTabChange("media")}
        >
          Media
        </button>
        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "inventory" ? "active" : ""
          }`}
          onClick={() => handleTabChange("inventory")}
        >
          Inventory
        </button>

        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "price" ? "active" : ""
          }`}
          onClick={() => handleTabChange("price")}
        >
          Price
        </button>

        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "attribute" ? "active" : ""
          }`}
          onClick={() => handleTabChange("attribute")}
        >
          Attribute
        </button>

        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "shipping-info" ? "active" : ""
          }`}
          onClick={() => handleTabChange("shipping-info")}
        >
          Shipping info
        </button>

        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "video" ? "active" : ""
          }`}
          onClick={() => handleTabChange("video")}
        >
          Video
        </button>

        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "shipping-config" ? "active" : ""
          }`}
          onClick={() => handleTabChange("shipping-config")}
        >
          Shipping Configuration
        </button>

        <button
          className={`btn btn-sm btn-outline-primary ${
            activeTab === "offer" ? "active" : ""
          }`}
          onClick={() => handleTabChange("offer")}
        >
          Offer
        </button>
      </div>
      <div className="tab-content product-data-tab">
        <div
          className={`tab-pane fade ${
            activeTab === "media" ? "show active" : ""
          }`}
        >
          <MediaPane />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "inventory" ? "show active" : ""
          }`}
        >
          <InventoryPane />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "price" ? "show active" : ""
          }`}
        >
          <PricePane />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "attribute" ? "show active" : ""
          }`}
        >
          <AttributePane />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "shipping-info" ? "show active" : ""
          }`}
        >
          <ShippingInfoPane />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "video" ? "show active" : ""
          }`}
        >
          <VideoPane />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "shipping-config" ? "show active" : ""
          }`}
        >
          <ShippingConfigPane />
        </div>
        <div
          className={`tab-pane ${activeTab === "offer" ? "show active" : ""}`}
        >
          <OfferPane />
        </div>
      </div>
    </nav>
  );
};

export default ProductDataTab;

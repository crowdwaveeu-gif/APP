import FleetTonnageCard from "../cards/FleetTonnageCard";
import OverviewPerformanceCard from "../cards/OverviewPerformanceCard";
import ReturnPendingCard from "../cards/ReturnPendingCard";
import TotalDeliveredCard from "../cards/TotalDeliveredCard";
import TotalOrderCard from "../cards/TotalOrderCard";
import TotalOrderCard2 from "../cards/TotalOrderCard2";
import TransportationCard from "../cards/TransportationCard";
import VisitedCountryCard from "../cards/VisitedCountryCard";
import ShipmentHistoryCard from "../cards/ShipmentHistoryCard";

const IndexMain = () => {
  return (
    <div className="row g-4">
      <div className="col-12 col-sm-6 col-xxl-3">
        <TotalOrderCard />
      </div>

      <div className="col-12 col-sm-6 col-xxl-3">
        <TotalDeliveredCard />
      </div>

      <div className="col-12 col-sm-6 col-xxl-3">
        <ReturnPendingCard />
      </div>

      <div className="col-12 col-sm-6 col-xxl-3">
        <TotalOrderCard2 />
      </div>

      <div className="col-12 col-lg-7 col-xxl-8">
        <div className="row g-4">
          <div className="col-12">
            <TransportationCard />
          </div>

          {/* <div className="col-12 col-xxl-6">
            <FleetTonnageCard />
          </div> */}

          {/* TODO: Repurpose or replace with courier-specific data
              Original: "Visits by Country" - Web analytics card
              Could be: "Deliveries by Region/City" or "Top Delivery Zones" 
              Currently hardcoded with generic country visit data */}
          {/* <div className="col-12 col-xxl-6">
            <VisitedCountryCard />
          </div> */}

          {/* TODO: Repurpose or replace with courier-specific metrics
              Original: "Overview/Performance" - Education metrics (Attendance, Homeworks, Tests)
              Could be: Driver Performance, Delivery Success Rate, Route Efficiency
              Currently hardcoded with school/education data */}
          {/* <div className="col-12">
            <OverviewPerformanceCard />
          </div> */}
        </div>
      </div>

      <div className="col-12 col-lg-5 col-xxl-4">
        <ShipmentHistoryCard />
      </div>
    </div>
  );
};
export default IndexMain;

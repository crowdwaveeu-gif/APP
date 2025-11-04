import DeliveredCard from "../cards/DeliveredCard";
import EarningCard from "../cards/EarningCard";
import LatestOrderCard from "../cards/LatestOrderCard";
import NewPackageCard from "../cards/NewPackageCard";
import ShipmentStatisticCard from "../cards/ShipmentStatisticCard";
import ShippingCard from "../cards/ShippingCard";
import TopCountryCard from "../cards/TopCountryCard";
import TotalOrderCard3 from "../cards/TotalOrderCard3";
import TotalReviewCard from "../cards/TotalReviewCard";
import TransitCard from "../cards/TransitCard";

const LogisticTabpane = () => {
  return (
    <div className="row g-xl-4 g-3">
      <div className="col-12 col-lg-5">
        <div className="row g-xl-4 g-3">
          <div className="col-12 col-sm-6">
            <NewPackageCard />
          </div>

          <div className="col-12 col-sm-6">
            <ShippingCard />
          </div>

          <div className="col-12 col-sm-6">
            <TransitCard />
          </div>

          <div className="col-12 col-sm-6">
            <DeliveredCard />
          </div>

          <div className="col-12">
            <EarningCard />
          </div>

          <div className="col-12">
            <TotalReviewCard />
          </div>

          <div className="col-12">
            <TotalOrderCard3 />
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="row g-4">
          <div className="col-12">
            <ShipmentStatisticCard />
          </div>

          <div className="col-12 ">
            <TopCountryCard />
          </div>
        </div>
      </div>

      <div className="col-12">
        <LatestOrderCard />
      </div>
    </div>
  );
};
export default LogisticTabpane;

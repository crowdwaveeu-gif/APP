import DeliveryCard from "../cards/DeliveryCard";
import NetSalesCard from "../cards/NetSalesCard";
import NoCustomerCard from "../cards/NoCustomerCard";
import NoOrderCard from "../cards/NoOrderCard";
import OrderListCard from "../cards/OrderListCard";
import SellingPlatformCard from "../cards/SellingPlatformCard";
import ShipmentStatCard from "../cards/ShipmentStatCard";
import TotalExpenseCard from "../cards/TotalExpenseCard";
import UserOnlineCard from "../cards/UserOnlineCard";
import DashboardHeader from "../header/DashboardHeader";

const DeliveryMain = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <DashboardHeader />
      </div>

      <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xxl-3">
        <NetSalesCard />
      </div>

      <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xxl-3">
        <DeliveryCard />
      </div>

      <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xxl-3">
        <NoOrderCard />
      </div>

      <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xxl-3">
        <NoCustomerCard />
      </div>

      <div className="col-12 col-xl-8">
        <ShipmentStatCard />
      </div>

      <div className="col-12 col-lg-6 col-xl-4">
        <SellingPlatformCard />
      </div>

      <div className="col-12 col-lg-6 col-xl-4">
        <TotalExpenseCard />
      </div>

      <div className="col-12 col-xl-8">
        <UserOnlineCard />
      </div>

      <div className="col-12">
        <OrderListCard />
      </div>
    </div>
  );
};
export default DeliveryMain;

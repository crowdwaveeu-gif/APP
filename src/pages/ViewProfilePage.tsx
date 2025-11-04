import ProfileCard from "../components/profile/ProfileCard";
import ProfileCard2 from "../components/profile/ProfileCard2";
import ProfileCard3 from "../components/profile/ProfileCard3";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import UserActivities from "../components/profile/UserActivities";

const ViewProfilePage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">View Profile</h6>
        </div>
      </div>

      <div className="col-12 col-xl-4">
        <div className="panel">
          <div className="panel-body">
            <ProfileSidebar />
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-8">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <ProfileCard />
          </div>
          <div className="col-12 col-lg-4">
            <ProfileCard2 />
          </div>
          <div className="col-12 col-lg-4">
            <ProfileCard3 />
          </div>
          <div className="col-12">
            <UserActivities />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewProfilePage;

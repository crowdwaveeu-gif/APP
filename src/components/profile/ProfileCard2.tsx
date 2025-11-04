const ProfileCard2 = () => {
  return (
    <div className="dashboard-top-box panel-bg">
      <div className="left">
        <h3>36,894</h3>
        <p>Orders</p>
        <a href="#">Orders in transit</a>
      </div>
      <div className="right">
        <span className="text-primary">+16.24%</span>
        <div className="part-icon rounded">
          <span>
            <i className="fa-light fa-bag-shopping"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard2;

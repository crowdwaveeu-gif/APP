const ProfileCard = () => {
  return (
    <div className="dashboard-top-box panel-bg">
      <div className="left">
        <h3>$34,152</h3>
        <p>Shipping fees</p>
        <a href="#">Net earnings</a>
      </div>
      <div className="right">
        <span className="text-primary">+16.24%</span>
        <div className="part-icon rounded">
          <span>
            <i className="fa-light fa-dollar-sign"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;

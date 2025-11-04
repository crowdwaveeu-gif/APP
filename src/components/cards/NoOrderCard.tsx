const NoOrderCard = () => {
  return (
    <div className="card delivery-card full-height">
      <p className="mb-4">No Orders</p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="me-4">
          <h4>2547</h4>
          <p className="mb-0 increase">
            <i className="ti ti-arrow-up"></i>33.02%
          </p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="38"
            viewBox="0 0 25 38"
            fill="none"
          >
            <path
              d="M2 25.8C2 29.5555 5.13401 32.6 9 32.6H16C19.866 32.6 23 29.5555 23 25.8C23 22.0445 19.866 19 16 19H9C5.13401 19 2 15.9555 2 12.2C2 8.44446 5.13401 5.4 9 5.4H16C19.866 5.4 23 8.44446 23 12.2M12.5 2V36"
              stroke="#28A956"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default NoOrderCard;

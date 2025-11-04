const NetSalesCard = () => {
  return (
    <div className="card delivery-card full-height">
      <p className="mb-4">Net Sales</p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="me-4">
          <h4>$4,689.00</h4>
          <p className="mb-0 increase">
            <i className="ti ti-arrow-up"></i>18.72%
          </p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="36"
            viewBox="0 0 44 36"
            fill="none"
          >
            <path
              d="M30 26H3C2.44771 26 2 25.5523 2 25V3C2 2.44772 2.44772 2 3 2H29C29.5523 2 30 2.44772 30 3V11M30 26H41.5C42.0523 26 42.5 25.5523 42.5 25V18.3699C42.5 18.1312 42.4146 17.9004 42.2593 17.7191L36.7993 11.3492C36.6093 11.1276 36.332 11 36.0401 11H30M30 26V11"
              stroke="#28A956"
              strokeWidth="3"
            />
            <circle cx="36" cy="30" r="4" stroke="#28A956" strokeWidth="3" />
            <circle cx="10.5" cy="30" r="4" stroke="#28A956" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default NetSalesCard;

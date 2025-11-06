import { useOrderStats } from "../../hooks";

const TotalDeliveredCard = () => {
  const { data: orderStats, loading, error } = useOrderStats();

  return (
    <div className="card full-height">
      <div className="top-content mb-4 d-flex align-items-center justify-content-between">
        <div className="icon-wrap me-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M35.6445 17.8543H37.5712C37.3021 17.4718 37.0187 17.1176 36.7212 16.7634L35.6445 17.8543Z"
              fill="#053810"
            />
            <path
              opacity="0.4"
              d="M35.2314 15.2617C34.8773 14.9642 34.5231 14.6808 34.1406 14.4117V16.3383L35.2314 15.2617Z"
              fill="#053810"
            />
            <path
              opacity="0.3"
              d="M33.0781 19.9792C32.9365 19.9792 32.8089 19.9509 32.6673 19.8942C32.4123 19.7809 32.1998 19.5825 32.0864 19.3134C32.0298 19.1859 32.0014 19.0442 32.0014 18.9025V13.2359C32.0014 13.2217 32.0156 13.2075 32.0156 13.1792C30.1881 12.3292 28.1481 11.8334 25.9948 11.8334C18.1748 11.8334 11.8281 18.18 11.8281 26C11.8281 33.82 18.1748 40.1667 25.9948 40.1667C33.8148 40.1667 40.1615 33.82 40.1615 26C40.1615 23.8467 39.6656 21.8067 38.8015 19.965C38.7873 19.965 38.7731 19.9792 38.7448 19.9792H33.0781Z"
              fill="#053810"
            />
            <path
              d="M29.5 24.5C29.5 23 28.5 21.8 27 21.8C24.5 21.8 22.5 23.8 22.5 26.2C22.5 28.6 24.5 30.6 27 30.6C28.5 30.6 29.5 29.4 29.5 27.9M20 25.2H29.5M20 27.2H29.5"
              stroke="#053810"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <div className="card-content d-flex align-items-end justify-content-between">
        <div className="me-4">
          <p className="mb-2">Completed Deliveries</p>
          <h4 className="mb-0">
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : error ? (
              <span className="text-danger">Error</span>
            ) : (
              orderStats?.completedDeliveries.toLocaleString() || '0'
            )}
          </h4>
        </div>
        {/* <div className="increase-decrease-result">
          {loading ? '...' : `+${orderStats?.monthlyGrowth.toFixed(1) || '0'}%`}
        </div> */}
      </div>
    </div>
  );
};
export default TotalDeliveredCard;

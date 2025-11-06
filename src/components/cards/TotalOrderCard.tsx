import { useOrderStats } from "../../hooks";

const TotalOrderCard = () => {
  const { data: orderStats, loading, error } = useOrderStats();

  return (
    <div className="card full-height">
      <div className="top-content mb-4 d-flex align-items-center justify-content-between">
        <div className="icon-wrap me-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
          >
            <path
              opacity="0.3"
              d="M25.9203 12.9466L22.7069 20.4266H19.4936C18.9603 20.4266 18.4403 20.4666 17.9336 20.5732L19.2669 17.3733L19.3203 17.2533L19.4003 17.0399C19.4403 16.9466 19.4669 16.8666 19.5069 16.7999C21.0536 13.2133 22.7869 12.0933 25.9203 12.9466Z"
              fill="#053810"
            />
            <path
              opacity="0.3"
              d="M34.9774 20.7867L34.9507 20.7733C34.1507 20.5467 33.3374 20.4267 32.5107 20.4267H24.1641L27.1641 13.4533L27.2041 13.36C27.3907 13.4267 27.5907 13.52 27.7907 13.5867L30.7374 14.8267C32.3774 15.5067 33.5241 16.2133 34.2307 17.0667C34.3507 17.2267 34.4574 17.3733 34.5641 17.5467C34.6841 17.7333 34.7774 17.92 34.8307 18.12C34.8841 18.24 34.9241 18.3467 34.9507 18.4667C35.1507 19.1467 35.1641 19.92 34.9774 20.7867Z"
              fill="#053810"
            />
            <path
              d="M34.3883 22.6932C33.7883 22.5199 33.1616 22.4266 32.5083 22.4266H19.4949C18.5883 22.4266 17.7349 22.5999 16.9349 22.9466C14.6149 23.9466 12.9883 26.2532 12.9883 28.9332V31.5332C12.9883 31.8532 13.0149 32.1599 13.0549 32.4799C13.3483 36.7199 15.6149 38.9866 19.8549 39.2666C20.1616 39.3066 20.4683 39.3332 20.8016 39.3332H31.2016C36.1349 39.3332 38.7349 36.9866 38.9883 32.3199C39.0016 32.0666 39.0149 31.7999 39.0149 31.5332V28.9332C39.0149 25.9866 37.0549 23.5066 34.3883 22.6932Z"
              fill="#053810"
            />
            <path
              d="M28.5 28.5C28.5 27.5 27.8 26.8 26.8 26.8C25.2 26.8 23.9 28.1 23.9 29.7C23.9 31.3 25.2 32.6 26.8 32.6C27.8 32.6 28.5 31.9 28.5 30.9M21.5 29.2H28.5M21.5 30.2H28.5"
              stroke="#053810"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <div className="card-content d-flex align-items-end justify-content-between">
        <div className="me-4">
          <p className="mb-2">Total Bookings</p>
          <h4 className="mb-0">
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : error ? (
              <span className="text-danger">Error</span>
            ) : (
              orderStats?.totalBookings.toLocaleString() || '0'
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
export default TotalOrderCard;

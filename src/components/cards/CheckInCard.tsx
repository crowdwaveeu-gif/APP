const CheckInCard = () => {
  return (
    <div className="card-2 d-flex align-items-center justify-content-center full-height red-bg-2">
      <div className="check-card-area">
        <div className="check-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <path
              d="M16.3828 21.9125L21.1828 17.1125L16.3828 12.3125"
              stroke="white"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17.1125H21.0688"
              stroke="white"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 2C25.2875 2 32 7.625 32 17C32 26.375 25.2875 32 17 32"
              stroke="white"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Check-in</h2>
      </div>
    </div>
  );
};
export default CheckInCard;

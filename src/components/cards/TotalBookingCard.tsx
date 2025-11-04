const TotalBookingCard = () => {
  return (
    <div className="bg-red- card-five d-flex justify-content-between full-height">
      <div className="d-flex">
        <div className="card-icon-5 me-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
          >
            <circle cx="26" cy="26" r="25" stroke="white" strokeOpacity="0.1" />
            <path
              d="M26.689 39H15.7432C14.2352 39 13.0002 37.791 13.0002 36.309V17.0174C13.0002 13.6114 15.5352 12.0645 18.6421 13.5854L24.414 16.4194C25.662 17.0304 26.689 18.6554 26.689 20.0333V39Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39.0024 29.9782V34.8921C39.0024 37.7 37.7025 39 34.8945 39H26.6917V23.9463L27.3026 24.0763L33.1525 25.3893L35.7915 25.9743C37.5075 26.3512 38.9114 27.2352 38.9894 29.7312C39.0024 29.8092 39.0024 29.8872 39.0024 29.9782Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5901 22.1003H22.101"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5901 27.3002H22.101"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33.1509 25.3893V29.5752C33.1509 31.1872 31.8379 32.5001 30.226 32.5001C28.614 32.5001 27.301 31.1872 27.301 29.5752V24.0763L33.1509 25.3893Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M38.9895 29.7312C38.9115 31.2652 37.6375 32.5002 36.0775 32.5002C34.4656 32.5002 33.1526 31.1872 33.1526 29.5752V25.3893L35.7915 25.9743C37.5075 26.3513 38.9115 27.2353 38.9895 29.7312Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="card-info-five">
          <p className="text-white mb-1">Total Booking</p>
          <h3 className="text-white mb-0">$246</h3>
        </div>
      </div>

      <div className="card-progress-five">
        <div className="dropdown-card-five">
          <div className="dropdown">
            <button className="btn dropdown-toggle dashboard-btn" type="button">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="4"
                  viewBox="0 0 18 4"
                  fill="none"
                >
                  <g opacity="0.4">
                    <path
                      d="M10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2C8 2.55228 8.44772 3 9 3C9.55228 3 10 2.55228 10 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3C16.5523 3 17 2.55228 17 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#">
                Jan
              </a>
              <a className="dropdown-item" href="#">
                Feb
              </a>
              <a className="dropdown-item" href="#">
                Mar
              </a>
            </div>
          </div>
        </div>

        <p className="mb-0">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
            >
              <path
                d="M14 1L7.93333 7.06667L5.62222 3.6L1 8.22222"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.1094 1H13.9983V3.88889"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          5.2%
        </p>
      </div>
    </div>
  );
};
export default TotalBookingCard;

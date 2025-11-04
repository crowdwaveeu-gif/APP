const TotalIncomeCard = () => {
  return (
    <div className="gold-bg-2 card-five d-flex justify-content-between full-height">
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
              d="M22.75 28.275C22.75 29.536 23.725 30.55 24.921 30.55H27.365C28.405 30.55 29.25 29.666 29.25 28.561C29.25 27.378 28.73 26.949 27.963 26.676L24.05 25.311C23.283 25.038 22.763 24.622 22.763 23.426C22.763 22.334 23.608 21.437 24.648 21.437H27.092C28.288 21.437 29.263 22.451 29.263 23.712"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26 20.15V31.85"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 26C39 33.176 33.176 39 26 39C18.824 39 13 33.176 13 26C13 18.824 18.824 13 26 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.5 14.3V19.5H37.7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 13L32.5 19.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="card-info-five">
          <p className="text-white mb-1">Total Income</p>
          <h3 className="text-white mb-0">858</h3>
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
export default TotalIncomeCard;

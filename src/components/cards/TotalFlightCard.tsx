const TotalFlightCard = () => {
  return (
    <div className="info-bg card-five d-flex justify-content-between full-height">
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
              d="M22.815 22.9096L21.8968 15.2063L21.8944 15.1098C21.8944 13.9446 22.839 13 24.0042 13C25.0568 13 26.031 13.5503 26.5983 14.4875L26.7115 14.6982L30.573 22.6825L35.7619 22.5306C37.6417 22.4754 39.2104 23.9546 39.2659 25.8488L39.2671 25.9344C39.2671 27.8152 37.7424 29.3399 35.8328 29.3395L30.6347 29.1873L26.7116 37.3017C26.2096 38.3402 25.1577 39 24.0042 39C22.839 39 21.8944 38.0554 21.8948 36.8609L21.9034 36.7062L22.8303 28.9589L20.0346 28.8773L19.682 29.842C19.3141 30.8481 18.3569 31.5173 17.2857 31.5173C16.1371 31.5173 15.206 30.5862 15.206 29.4372L15.2065 28.4412L15.0032 28.3989C13.8362 28.1553 13 27.1265 13 25.9344C13 24.7421 13.8368 23.7134 15.0039 23.4708L15.2065 23.4286L15.206 22.4311C15.206 21.3794 15.9903 20.4972 17.0872 20.3619L17.2857 20.3514C18.2625 20.3514 19.1514 20.9089 19.5993 21.8293L19.6817 22.0261L20.0353 22.9911L22.815 22.9096ZM24.0042 14.9669C23.9253 14.9669 23.8613 15.0309 23.8608 15.0805L25.0231 24.8126L18.6761 24.9987L17.8534 22.7495L17.8107 22.6458C17.7132 22.4461 17.5094 22.3183 17.3466 22.3164L17.2703 22.3192C17.2157 22.3261 17.1729 22.3743 17.1729 22.4306L17.1741 25.028L15.4045 25.3964C15.1496 25.4494 14.9669 25.674 14.9669 25.9344C14.9669 26.1952 15.1498 26.4202 15.4046 26.4734L17.1741 26.8418L17.1729 29.4377C17.1729 29.5 17.2234 29.5505 17.2857 29.5505C17.5311 29.5505 17.7504 29.3971 17.8346 29.1667L18.6741 26.8699L25.0389 27.0557L23.8628 36.8524L23.8613 36.8902C23.8613 36.9691 23.9253 37.0331 24.0042 37.0331C24.4032 37.0331 24.7671 36.8049 24.9408 36.4456L29.4186 27.184L35.8616 27.373C36.6561 27.373 37.3003 26.7289 37.3003 25.9488L37.2996 25.8922C37.2763 25.0981 36.6137 24.4733 35.8195 24.4966L29.3571 24.6858L24.9621 15.5959L24.8934 15.4672C24.7054 15.1573 24.3683 14.9669 24.0042 14.9669Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="card-info-five">
          <p className="text-white mb-1">Total Flight</p>
          <h3 className="text-white mb-0">7,358</h3>
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
export default TotalFlightCard;

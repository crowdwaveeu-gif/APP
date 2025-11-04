import OverviewChart from "../charts/OverviewChart";

const OverviewTabpane = () => {
  return (
    <div className="row align-items-center g-4">
      <div className="col-12 col-xxl-8">
        <div className="single-overview-data d-flex align-items-center justify-content-between flex-wrap">
          <div className="overview-content d-flex align-items-center me-sm-4">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M24.9091 15.2121C24.1818 15.2121 23.697 14.7273 23.697 14C23.697 13.2727 24.1818 12.7879 24.9091 12.7879H26C25.3939 7.09091 20.9091 2.48485 15.2121 2V3.09091C15.2121 3.81818 14.7273 4.30303 14 4.30303C13.2727 4.30303 12.7879 3.81818 12.7879 3.09091V2C7.0909 2.60606 2.48485 7.09091 2 12.7879H3.0909C3.81817 12.7879 4.30302 13.2727 4.30302 14C4.30302 14.7273 3.81817 15.2121 3.0909 15.2121H2C2.60606 20.9091 7.0909 25.5152 12.7879 26V24.9091C12.7879 24.1818 13.2727 23.697 14 23.697C14.7273 23.697 15.2121 24.1818 15.2121 24.9091V26C20.9091 25.3939 25.5152 20.9091 26 15.2121H24.9091Z"
                  fill="#444392"
                />
                <path
                  d="M20.7778 13.2H16.7445C16.5 12.84 16.2556 12.6 15.8889 12.36V7.2C15.8889 6.48 15.4 6 14.6667 6C13.9333 6 13.4445 6.48 13.4445 7.2V12.36C13.0778 12.6 12.8333 12.84 12.5889 13.2H12.2222C11.4889 13.2 11 13.68 11 14.4C11 15.12 11.4889 15.6 12.2222 15.6H12.5889C12.8333 15.96 13.0778 16.2 13.4445 16.44V16.8C13.4445 17.52 13.9333 18 14.6667 18C15.4 18 15.8889 17.52 15.8889 16.8V16.44C16.2556 16.2 16.5 15.96 16.7445 15.6H20.7778C21.5111 15.6 22 15.12 22 14.4C22 13.68 21.5111 13.2 20.7778 13.2Z"
                  fill="#444392"
                />
              </svg>
            </div>

            <div className="content">
              <p className="mb-0">Attendance</p>
              <span>Great, you always attending class. keep it up</span>
            </div>
          </div>
          <div className="status d-flex align-items-center">
            <h4 className="mb-0 me-3">
              <span>73</span> / 76
            </h4>
            <span className="success">95%</span>
          </div>
        </div>

        <div className="single-overview-data d-flex align-items-center justify-content-between flex-wrap">
          <div className="overview-content d-flex align-items-center me-sm-4">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M10.5556 2H4.44444C3.09441 2 2 3.09441 2 4.44444V10.5556C2 11.9056 3.09441 13 4.44444 13H10.5556C11.9056 13 13 11.9056 13 10.5556V4.44444C13 3.09441 11.9056 2 10.5556 2Z"
                  fill="#444392"
                />
                <path
                  opacity="0.3"
                  d="M21.5556 2H15.4444C14.0944 2 13 3.09441 13 4.44444V10.5556C13 11.9056 14.0944 13 15.4444 13H21.5556C22.9056 13 24 11.9056 24 10.5556V4.44444C24 3.09441 22.9056 2 21.5556 2Z"
                  fill="#444392"
                />
                <path
                  opacity="0.3"
                  d="M21.5556 13H15.4444C14.0944 13 13 14.0944 13 15.4444V21.5556C13 22.9056 14.0944 24 15.4444 24H21.5556C22.9056 24 24 22.9056 24 21.5556V15.4444C24 14.0944 22.9056 13 21.5556 13Z"
                  fill="#444392"
                />
                <path
                  opacity="0.3"
                  d="M10.5556 13H4.44444C3.09441 13 2 14.0944 2 15.4444V21.5556C2 22.9056 3.09441 24 4.44444 24H10.5556C11.9056 24 13 22.9056 13 21.5556V15.4444C13 14.0944 11.9056 13 10.5556 13Z"
                  fill="#444392"
                />
              </svg>
            </div>
            <div className="content">
              <p className="mb-0">Homeworks</p>
              <span>Don't forget to turn in your task</span>
            </div>
          </div>
          <div className="status d-flex align-items-center">
            <h4 className="mb-0 me-3">
              <span>207</span> / 214
            </h4>
            <span className="success">94%</span>
          </div>
        </div>

        <div className="single-overview-data d-flex align-items-center justify-content-between flex-wrap">
          <div className="overview-content d-flex align-items-center me-sm-4">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M19.6958 5.0747V9.96629L13.8861 13.3069V6.50639L18.0359 4.12024C18.7473 3.76231 19.6958 4.23954 19.6958 5.0747ZM2.62246 16.5282L6.77223 18.9144L12.5819 15.5738L6.77223 12.2331L2.62246 14.6193C1.79251 15.0966 1.79251 16.1703 2.62246 16.5282ZM21 23.9253V19.0337L15.1903 15.6931V22.4936L19.3401 24.8798C20.0515 25.2377 21 24.7605 21 23.9253Z"
                  fill="#444392"
                />
                <path
                  opacity="0.3"
                  d="M9.96412 4.12024L14.1139 6.50639V13.3069L8.30422 9.96629V5.0747C8.30422 4.23954 9.25273 3.76231 9.96412 4.12024ZM8.65991 24.8798L12.8097 22.4936V15.6931L7 19.0337V23.9253C7 24.7605 7.94852 25.2377 8.65991 24.8798ZM25.3775 14.6193L21.2278 12.2331L15.4181 15.5738L21.2278 18.9144L25.3775 16.5282C26.2075 16.1703 26.2075 15.0966 25.3775 14.6193Z"
                  fill="#444392"
                />
              </svg>
            </div>
            <div className="content">
              <p className="mb-0">Tests</p>
              <span>You take 12 subjects at this semester</span>
            </div>
          </div>
          <div className="status d-flex align-items-center">
            <h4 className="mb-0 me-3">
              <span>27</span> / 38
            </h4>
            <span className="warning">80%</span>
          </div>
        </div>
      </div>
      <div className="col-12 col-xxl-4">
        <OverviewChart />
      </div>
    </div>
  );
};
export default OverviewTabpane;

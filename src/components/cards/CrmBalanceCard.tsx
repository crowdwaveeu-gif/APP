const CrmBalanceCard = () => {
  return (
    <div className="card-three bg-white full-height">
      <div className="single-card-three">
        <div className="d-flex justify-content-between">
          <div className="single-card-three-content">
            <h6>Balance</h6>
            <h3>$465.98k</h3>
          </div>

          <div className="single-card-three-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5367 12.4208C16.1517 12.7967 15.9317 13.3375 15.9867 13.915C16.0692 14.905 16.9767 15.6292 17.9667 15.6292H19.7083V16.72C19.7083 18.6175 18.1592 20.1667 16.2617 20.1667H5.73835C3.84085 20.1667 2.29169 18.6175 2.29169 16.72V10.5509C2.29169 8.65336 3.84085 7.10419 5.73835 7.10419H16.2617C18.1592 7.10419 19.7083 8.65336 19.7083 10.5509V11.8709H17.8567C17.3433 11.8709 16.8759 12.0725 16.5367 12.4208Z"
                stroke="#1B84FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.29169 11.3758V7.1867C2.29169 6.09587 2.96085 5.12416 3.97835 4.73916L11.2567 1.98916C12.3934 1.55833 13.6125 2.40169 13.6125 3.62085V7.10417"
                stroke="#1B84FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.6789 12.806V14.6944C20.6789 15.1985 20.2756 15.611 19.7623 15.6293H17.9656C16.9756 15.6293 16.0681 14.9052 15.9856 13.9152C15.9306 13.3377 16.1506 12.7968 16.5356 12.421C16.8748 12.0727 17.3423 11.871 17.8556 11.871H19.7623C20.2756 11.8894 20.6789 12.3018 20.6789 12.806Z"
                stroke="#1B84FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className="d-block mb-0">
          <span className="bg-blue-2">
            +0.00%
            <svg
              fill="none"
              height="8"
              viewBox="0 0 10 8"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7L3.66667 3.72727L5 5.90909L9 1M9 1H6.33333M9 1V3.72727"
                stroke="white"
              />
            </svg>
          </span>{" "}
          Withdraw money
        </p>
      </div>
    </div>
  );
};
export default CrmBalanceCard;

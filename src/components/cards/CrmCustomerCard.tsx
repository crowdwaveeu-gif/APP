const CrmCustomerCard = () => {
  return (
    <div className="card-three bg-white full-height">
      <div className="single-card-three">
        <div className="d-flex justify-content-between">
          <div className="single-card-three-content">
            <h6>Customers</h6>
            <h3>297,359</h3>
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
                d="M11 11.6875C8.09416 11.6875 5.72916 9.32248 5.72916 6.41665C5.72916 3.51081 8.09416 1.14581 11 1.14581C13.9058 1.14581 16.2708 3.51081 16.2708 6.41665C16.2708 9.32248 13.9058 11.6875 11 11.6875ZM11 2.52081C8.85499 2.52081 7.10416 4.27165 7.10416 6.41665C7.10416 8.56164 8.85499 10.3125 11 10.3125C13.145 10.3125 14.8958 8.56164 14.8958 6.41665C14.8958 4.27165 13.145 2.52081 11 2.52081Z"
                fill="#1B84FF"
              />
              <path
                d="M18.8743 20.8542C18.4985 20.8542 18.1868 20.5425 18.1868 20.1667C18.1868 17.0042 14.9601 14.4375 11.0001 14.4375C7.04014 14.4375 3.81348 17.0042 3.81348 20.1667C3.81348 20.5425 3.50181 20.8542 3.12598 20.8542C2.75014 20.8542 2.43848 20.5425 2.43848 20.1667C2.43848 16.2525 6.27931 13.0625 11.0001 13.0625C15.721 13.0625 19.5618 16.2525 19.5618 20.1667C19.5618 20.5425 19.2501 20.8542 18.8743 20.8542Z"
                fill="#1B84FF"
              />
            </svg>
          </div>
        </div>

        <p className="d-block mb-0">
          <span>
            +487
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
          See details
        </p>
      </div>
    </div>
  );
};
export default CrmCustomerCard;

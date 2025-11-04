import { useEffect, useRef, useState } from "react";
import { useOrderStats } from "../../hooks";

const TotalOrderCard = () => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const { data: orderStats, loading, error } = useOrderStats();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
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
              d="M26.6915 33.5466H27.0249C27.4249 33.5466 27.7582 33.1866 27.7582 32.7466C27.7582 32.1866 27.5982 32.1066 27.2515 31.9733L26.6915 31.7733V33.5466Z"
              fill="#053810"
            />
            <path
              d="M34.3883 22.6932C33.7883 22.5199 33.1616 22.4266 32.5083 22.4266H19.4949C18.5883 22.4266 17.7349 22.5999 16.9349 22.9466C14.6149 23.9466 12.9883 26.2532 12.9883 28.9332V31.5332C12.9883 31.8532 13.0149 32.1599 13.0549 32.4799C13.3483 36.7199 15.6149 38.9866 19.8549 39.2666C20.1616 39.3066 20.4683 39.3332 20.8016 39.3332H31.2016C36.1349 39.3332 38.7349 36.9866 38.9883 32.3199C39.0016 32.0666 39.0149 31.7999 39.0149 31.5332V28.9332C39.0149 25.9866 37.0549 23.5066 34.3883 22.6932ZM27.7083 30.6666C28.3216 30.8799 29.1483 31.3332 29.1483 32.7466C29.1483 33.9599 28.2016 34.9332 27.0283 34.9332H26.6949V35.2266C26.6949 35.6132 26.3883 35.9199 26.0016 35.9199C25.6149 35.9199 25.3083 35.6132 25.3083 35.2266V34.9332H25.1883C23.9083 34.9332 22.8549 33.8532 22.8549 32.5199C22.8549 32.1332 23.1616 31.8266 23.5483 31.8266C23.9349 31.8266 24.2416 32.1332 24.2416 32.5199C24.2416 33.0799 24.6683 33.5466 25.1883 33.5466H25.3083V31.2932L24.2949 30.9332C23.6816 30.7199 22.8549 30.2666 22.8549 28.8532C22.8549 27.6399 23.8016 26.6666 24.9749 26.6666H25.3083V26.3732C25.3083 25.9866 25.6149 25.6799 26.0016 25.6799C26.3883 25.6799 26.6949 25.9866 26.6949 26.3732V26.6666H26.8149C28.0949 26.6666 29.1483 27.7466 29.1483 29.0799C29.1483 29.4666 28.8416 29.7732 28.4549 29.7732C28.0683 29.7732 27.7616 29.4666 27.7616 29.0799C27.7616 28.5199 27.3349 28.0532 26.8149 28.0532H26.6949V30.3066L27.7083 30.6666Z"
              fill="#053810"
            />
            <path
              d="M24.2422 28.8533C24.2422 29.4133 24.4022 29.4933 24.7489 29.6267L25.3089 29.8267V28.0533H24.9755C24.5622 28.0533 24.2422 28.4133 24.2422 28.8533Z"
              fill="#053810"
            />
          </svg>
        </div>
        <div className="dropdown dropstart" ref={dropdownRef}>
          <button
            className={`btn p-0 ${activeDropdown ? "show" : ""}`}
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="18"
              viewBox="0 0 4 18"
              fill="none"
            >
              <g opacity="0.4">
                <path
                  d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                  stroke="#737B8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                  stroke="#737B8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                  stroke="#737B8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
          <div
            className={`dropdown-menu dropdown-menu-end ${
              activeDropdown ? "show" : ""
            }`}
          >
            <a className="dropdown-item" href="#">
              Jan 24
            </a>
            <a className="dropdown-item" href="#">
              Feb 24
            </a>
            <a className="dropdown-item" href="#">
              Mar 24
            </a>
          </div>
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

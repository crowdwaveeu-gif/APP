import { useEffect, useRef, useState } from "react";
import { useOrderStats } from "../../hooks";

const TotalDeliveredCard = () => {
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
            width="50"
            height="50"
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
              d="M36.7362 16.7633L40.9153 12.5841C41.3262 12.1733 41.3262 11.4933 40.9153 11.0825C40.5045 10.6716 39.8245 10.6716 39.4137 11.0825L35.2345 15.2616C35.7728 15.7291 36.2687 16.2391 36.7362 16.7633Z"
              fill="#053810"
            />
            <path
              d="M34.146 13.25C34.146 12.6692 33.6643 12.1875 33.0835 12.1875C32.5168 12.1875 32.0635 12.6408 32.0352 13.1933C32.7718 13.5475 33.4801 13.9442 34.146 14.4117V13.25Z"
              fill="#053810"
            />
            <path
              d="M39.8086 18.9167C39.8086 18.3359 39.327 17.8542 38.7461 17.8542H37.5703C38.0378 18.52 38.4486 19.2284 38.7886 19.965C39.3553 19.9367 39.8086 19.4834 39.8086 18.9167Z"
              fill="#053810"
            />
            <path
              d="M28.4818 25.745L27.0651 25.2492V22.1042H27.1784C27.9009 22.1042 28.4818 22.7417 28.4818 23.5208C28.4818 24.1017 28.9634 24.5833 29.5443 24.5833C30.1251 24.5833 30.6068 24.1017 30.6068 23.5208C30.6068 21.5658 29.0768 19.9792 27.1784 19.9792H27.0651V19.625C27.0651 19.0442 26.5834 18.5625 26.0026 18.5625C25.4218 18.5625 24.9401 19.0442 24.9401 19.625V19.9792H24.5151C22.801 19.9792 21.3984 21.4242 21.3984 23.2092C21.3984 25.2775 22.6026 25.9433 23.5234 26.2692L24.9401 26.765V29.91H24.8268C24.1043 29.91 23.5234 29.2725 23.5234 28.4933C23.5234 27.9125 23.0418 27.4308 22.4609 27.4308C21.8801 27.4308 21.3984 27.9125 21.3984 28.4933C21.3984 30.4483 22.9285 32.035 24.8268 32.035H24.9401V32.3892C24.9401 32.97 25.4218 33.4517 26.0026 33.4517C26.5834 33.4517 27.0651 32.97 27.0651 32.3892V32.035H27.4901C29.2043 32.035 30.6068 30.59 30.6068 28.805C30.6068 26.7225 29.4026 26.0567 28.4818 25.745ZM24.2176 24.2433C23.7359 24.0733 23.5234 23.9742 23.5234 23.195C23.5234 22.5858 23.9768 22.09 24.5151 22.09H24.9401V24.4842L24.2176 24.2433ZM27.4901 29.8958H27.0651V27.5017L27.7876 27.7567C28.2693 27.9267 28.4818 28.0258 28.4818 28.805C28.4818 29.4 28.0284 29.8958 27.4901 29.8958Z"
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

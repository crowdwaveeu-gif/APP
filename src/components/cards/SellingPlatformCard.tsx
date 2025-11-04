import { useEffect, useRef, useState } from "react";
import SellingPlatformChart from "../charts/SellingPlatformChart";

const SellingPlatformCard = () => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

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
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Selling Platform</h5>

        <div className="dropdown dropstart" ref={dropdownRef}>
          <button
            className={`btn pe-0 ${activeDropdown ? "show" : ""}`}
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="16"
              viewBox="0 0 4 16"
              fill="none"
            >
              <path
                d="M2 16C0.89543 16 0 15.1046 0 14C0 12.8954 0.89543 12 2 12C3.10457 12 4 12.8954 4 14C4 15.1046 3.10457 16 2 16ZM2 10C0.89543 10 0 9.10457 0 8C0 6.89543 0.89543 6 2 6C3.10457 6 4 6.89543 4 8C4 8.53043 3.78929 9.03914 3.41421 9.41421C3.03914 9.78929 2.53043 10 2 10ZM2 4C0.89543 4 0 3.10457 0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4Z"
                fill="#343A40"
              />
            </svg>
          </button>
          <ul className={`dropdown-menu ${activeDropdown ? "show" : ""}`}>
            <li>
              <a className="dropdown-item" href="#">
                Update
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Delete
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Details
              </a>
            </li>
          </ul>
        </div>
      </div>

      <SellingPlatformChart />
    </div>
  );
};
export default SellingPlatformCard;

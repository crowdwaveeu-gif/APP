import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
};
const EmailTableHeader = ({ title }: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="panel-header">
      <div className="d-flex align-items-center gap-1">
        <h5>{title}</h5>
      </div>

      <div className="btn-box d-flex gap-2">
        <div className="tableSearch">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
          />
        </div>

        <button className="btn btn-sm btn-icon btn-light">
          <i className="fa-light fa-arrows-rotate"></i>
        </button>
        <div className="digi-dropdown dropdown" ref={dropdownRef}>
          <button
            className="btn btn-sm btn-icon btn-light"
            onClick={toggleDropdown}
          >
            <i className="fa-regular fa-ellipsis-vertical"></i>
          </button>
          <ul
            className={`digi-dropdown-menu dropdown-menu ${
              dropdown ? "show" : ""
            }`}
          >
            <li className="dropdown-title">Show Table Title</li>
            <li>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />
                  Sender
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />
                  Subject
                </label>
              </div>
            </li>
            <li className="dropdown-title pb-1">Showing</li>
            <li>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control w-40 h-100 py-2"
                  placeholder="10"
                />
                <button
                  className="btn btn-primary w-60 h-100
                "
                >
                  Apply
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default EmailTableHeader;

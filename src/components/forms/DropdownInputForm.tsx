import { useEffect, useRef, useState } from "react";

const DropdownInputForm = () => {
  const [activeDropdown, setActiveDropdown] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const dropdownRef3 = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownRef2.current &&
        !dropdownRef2.current.contains(e.target as Node) &&
        dropdownRef3.current &&
        !dropdownRef3.current.contains(e.target as Node)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Buttons with dropdowns</h5>
      </div>
      <div className="panel-body">
        <div className="row g-3">
          <div className="col-12">
            <div className="input-group" ref={dropdownRef}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={() => toggleDropdown("dropdown-1")}
              >
                Dropdown
              </button>
              <ul
                className={`dropdown-menu dropdown-1 ${
                  activeDropdown === "dropdown-1" ? "show" : ""
                }`}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
              <input
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-group" ref={dropdownRef2}>
              <input
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
              />
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={() => toggleDropdown("dropdown-2")}
              >
                Dropdown
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end dropdown-2 ${
                  activeDropdown === "dropdown-2" ? "show" : ""
                }`}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group" ref={dropdownRef3}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={() => toggleDropdown("dropdown-3")}
              >
                Dropdown
              </button>
              <ul
                className={`dropdown-menu dropdown-3 ${
                  activeDropdown === "dropdown-3" ? "show" : ""
                }`}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action before
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action before
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
              <input
                type="text"
                className="form-control"
                aria-label="Text input with 2 dropdown buttons"
              />
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={() => toggleDropdown("dropdown-4")}
              >
                Dropdown
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end dropdown-4 ${
                  activeDropdown === "dropdown-4" ? "show" : ""
                }`}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DropdownInputForm;

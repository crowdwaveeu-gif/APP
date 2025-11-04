import { useEffect, useRef, useState } from "react";
import { LeadsDataType } from "../../types";

type Props = {
  tableData: LeadsDataType[];
};

const LeadsTable = ({ tableData }: Props) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (activeDropdown !== null && dropdownRefs?.current[activeDropdown]) {
        if (
          !dropdownRefs?.current[activeDropdown]?.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeDropdown]);

  const toggleDropdown = (dropdown: number) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownButtonClick = (dropdown: number) => {
    toggleDropdown(dropdown);
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <table
      className="table table-dashed table-hover digi-dataTable leads-table"
      id="leadsTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllLeads"
              />
            </div>
          </th>
          <th>Action</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Company</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <div
                className="digi-dropdown dropdown d-inline-block"
                ref={(ref) => (dropdownRefs.current[item.id] = ref)}
              >
                <button
                  className={`btn btn-icon btn-sm btn-primary ${
                    activeDropdown === item.id ? "show" : ""
                  }`}
                  onClick={() => handleDropdownButtonClick(item.id)}
                >
                  <i className="ti ti-plus"></i>
                </button>

                <ul
                  className={`digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
                    activeDropdown === item.id ? "show" : ""
                  }`}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      <span className="dropdown-icon">
                        <i className="fa-light fa-pen-to-square"></i>
                      </span>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      <span className="dropdown-icon">
                        <i className="fa-light fa-trash-can"></i>
                      </span>
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.company}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadsTable;

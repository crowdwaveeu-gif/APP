import { AllEmployeeDataType } from "../../types";
import { useEffect, useRef, useState } from "react";

type Props = {
  tableData: AllEmployeeDataType[];
};
const AllEmployeeTable = ({ tableData }: Props) => {
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
      className="table table-dashed table-hover digi-dataTable all-employee-table"
      id="allEmployeeTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllEmployee"
              />
            </div>
          </th>
          <th>Action</th>
          <th>Employee ID</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Section</th>
          <th>Phone</th>
          <th>Present Address</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.employeeId}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <div
                className="digi-dropdown dropdown d-inline-block"
                ref={(ref) => (dropdownRefs.current[item.employeeId] = ref)}
              >
                <button
                  className={`btn btn-icon btn-sm btn-primary ${
                    activeDropdown === item.employeeId ? "show" : ""
                  }`}
                  onClick={() => handleDropdownButtonClick(item.employeeId)}
                >
                  <i className="ti ti-plus"></i>
                </button>
                <ul
                  className={`digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
                    activeDropdown === item.employeeId ? "show" : ""
                  }`}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      <span className="dropdown-icon">
                        <i className="fa-light fa-eye"></i>
                      </span>
                      View
                    </a>
                  </li>
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
                        <i className="fa-light fa-id-card"></i>
                      </span>
                      ID Card
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      <span className="dropdown-icon">
                        <i className="fa-light fa-pen-nib"></i>
                      </span>
                      Resign
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      <span className="dropdown-icon">
                        <i className="fa-light fa-arrow-right-from-bracket"></i>
                      </span>
                      Left
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
            <td>ID-{item.employeeId}</td>
            <td>
              <div className="avatar">
                <img src={item.image} alt="User" />
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.section}</td>
            <td>{item.phone}</td>
            <td>
              <span className="address-txt">{item.presentAddress}L</span>
            </td>
            <td>
              <span className="active-mark">
                <i className="fa-regular fa-check"></i>
              </span>
              Active
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AllEmployeeTable;

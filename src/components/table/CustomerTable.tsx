import { CustomerDataType } from "../../types";
import { useEffect, useRef, useState } from "react";

type Props = {
  tableData: CustomerDataType[];
  handleCheckboxChange: (index: number) => void;
};
const CustomerTable = ({ tableData, handleCheckboxChange }: Props) => {
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
      className="table table-dashed table-hover digi-dataTable all-customer-table"
      id="allCustomerTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllCustomer"
              />
            </div>
          </th>
          <th>Action</th>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Group</th>
          <th>Type</th>
          <th>Credit Limit</th>
          <th>Opening Balance</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Closing Balance</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={item.customerId}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <div
                className="digi-dropdown dropdown d-inline-block"
                ref={(ref) => (dropdownRefs.current[index] = ref)}
              >
                <button
                  className={`btn btn-icon btn-sm btn-primary ${
                    activeDropdown === index ? "show" : ""
                  }`}
                  onClick={() => handleDropdownButtonClick(index)}
                >
                  <i className="ti ti-plus"></i>
                </button>
                <ul
                  className={`digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
                    activeDropdown === index ? "show" : ""
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
            <td>C-000{item.customerId}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.group}</td>
            <td>{item.customerType}</td>
            <td>{item.creditLimit}</td>
            <td>{item.openingBalance}</td>
            <td>{item.debit}</td>
            <td>{item.credit}</td>
            <td>{item.closingBalance}</td>
            <td>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CustomerTable;

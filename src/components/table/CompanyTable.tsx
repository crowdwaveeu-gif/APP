import { CompanyDataType } from "../../types";

type Props = {
  tableData: CompanyDataType[];
  handleCheckboxChange: (index: number) => void;
};
const CompanyTable = ({ tableData, handleCheckboxChange }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable company-table"
      id="companyTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllCompany"
              />
            </div>
          </th>
          <th>Company</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Contact Person</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={item.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>{item.company}</td>
            <td>{item.address}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.contact_person}</td>
            <td>
              <div className="form-check d-flex justify-content-center form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={item.checked}
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
export default CompanyTable;

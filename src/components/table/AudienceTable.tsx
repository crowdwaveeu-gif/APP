import { AudienceDataType } from "../../types";

type Props = {
  tableData: AudienceDataType[];
  handleCheckboxChange: (index: number) => void;
};
const AudienceTable = ({ tableData, handleCheckboxChange }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable target-audience-table"
      id="targetAudienceTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllAudience"
              />
            </div>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Position</th>
          <th>Last Login</th>
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
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.company}</td>
            <td>{item.phone}</td>
            <td>{item.position}</td>
            <td>{item.lastLogin}</td>
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
export default AudienceTable;

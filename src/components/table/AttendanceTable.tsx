import { AttendanceDataType } from "../../types";

type Props = {
  tableData: AttendanceDataType[];
  handleDelete: (id: number) => void;
};
const AttendanceTable = ({ tableData, handleDelete }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable attendance-table table-striped"
      id="attendanceTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllAttendance"
              />
            </div>
          </th>
          <th>Date</th>
          <th>Name</th>
          <th>Employee ID</th>
          <th>Division</th>
          <th>Check In - Check Out</th>
          <th>Status</th>
          <th>Shift</th>
          <th>Action</th>
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
            <td>{item.date}</td>
            <td>{item.name}</td>
            <td>{item.employeeId}</td>
            <td>{item.division}</td>
            <td>08:30 AM - 04:30 PM</td>
            <td>
              <span className="badge bg-success rounded">On Time</span>
            </td>
            <td>{item.shift}</td>
            <td>
              <div className="btn-box">
                <button className="btn btn-sm btn-icon btn-primary">
                  <i className="fa-light fa-edit"></i>
                </button>
                <button
                  className="btn btn-sm btn-icon btn-danger"
                  onClick={() => handleDelete(item.employeeId)}
                >
                  <i className="fa-light fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AttendanceTable;

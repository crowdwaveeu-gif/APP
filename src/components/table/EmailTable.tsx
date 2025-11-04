import { useState } from "react";
import { EmailDataType } from "../../types";

type Props = {
  tableData: EmailDataType[];
  toggleDetails: () => void;
};
const EmailTable = ({ tableData, toggleDetails }: Props) => {
  const [activeBtn, setActiveBtn] = useState<number[]>([]);
  const toggleStar = (id: number) => {
    if (activeBtn.includes(id)) {
      // If id exists in activeBtn array, remove it
      setActiveBtn(activeBtn.filter((btnId) => btnId !== id));
    } else {
      // If id does not exist in activeBtn array, add it
      setActiveBtn([...activeBtn, id]);
    }
  };
  return (
    <table className="table table-dashed table-hover digi-dataTable email-table">
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input className="form-check-input markAllMail" type="checkbox" />
            </div>
          </th>
          <th className="no-sort">
            <i className="fa-light fa-star"></i>
          </th>
          <th>Sender</th>
          <th>Subject</th>
          <th className="no-sort">
            <i className="fa-light fa-paperclip"></i>
          </th>
          <th className="no-sort">Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr className="unread" key={item.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <button
                className={`btn-star ${
                  activeBtn.includes(item.id) ? "starred" : ""
                }`}
                onClick={() => toggleStar(item.id)}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            </td>
            <td>
              <span className="table-txt">{item.name}</span>
            </td>
            <td>
              <span className="table-txt" role="button" onClick={toggleDetails}>
                {item.email_content}
              </span>
            </td>
            <td>
              <i className="fa-light fa-paperclip"></i>
            </td>
            <td>
              <div className="btn-box ms-0">
                <button className="btn-flush">
                  <i className="fa-light fa-box-archive"></i>
                </button>
                <button className="btn-flush">
                  <i className="fa-light fa-circle-exclamation"></i>
                </button>
                <button className="btn-flush">
                  <i className="fa-light fa-envelope"></i>
                </button>
                <button className="btn-flush">
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
export default EmailTable;

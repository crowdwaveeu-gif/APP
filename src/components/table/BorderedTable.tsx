import { defaultTableData } from "../../data";

const BorderedTable = () => {
  return (
    <div className="col-xl-4">
      <div className="">
        <div className="border-bottom pb-2 fw-bold text-dark mb-4 card-header">
          Bordered tables
        </div>
        <div className="card-body">
          <p className="fs-14 pb-1 mb-10">
            Add <code>.table-bordered</code> for borders on all sides of the
            table and cells.
          </p>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Client</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {defaultTableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.client}</td>
                    <td>{row.dueDate}</td>
                    <td>
                      <span
                        className={
                          row.status === "Paid"
                            ? "badge bg-success px-2"
                            : "badge bg-primary px-2"
                        }
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BorderedTable;

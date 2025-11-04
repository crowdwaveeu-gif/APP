import { defaultTableData } from "../../data";

const StrippedRowTable = () => {
  return (
    <div className="col-xl-6">
      <div className="">
        <div className="border-bottom pb-2 fw-bold text-dark mb-4 card-header">
          Striped Rows
        </div>
        <div className="card-body">
          <p className="fs-14 pb-1 mb-10">
            Use <code>table-striped</code>
            class to add zebra-striping to any table row within the
            <code>&lt;tbody&gt;</code>.
          </p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Client</th>
                  <th>Due Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {defaultTableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.client}</td>
                    <td>{row.dueDate}</td>
                    <td>{row.total}</td>
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
export default StrippedRowTable;

import { defaultTableData } from "../../data";

const HoverableTable = () => {
  return (
    <div className="col-12">
      <div className="">
        <div className="border-bottom pb-2 fw-bold text-dark mb-4 card-header">
          Hoverable Table
        </div>
        <div className="card-body">
          <p className="fs-14 pb-1 mb-10">
            Add <code>.table-hover</code> to enable a hover state on table rows
            within a <code>&lt;tbody&gt;</code>.
          </p>
          <div className="row g-3">
            <div className="col-lg-6">
              <div className="table-responsive">
                <table className="table table-hover">
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
            <div className="col-lg-6">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
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
      </div>
    </div>
  );
};
export default HoverableTable;

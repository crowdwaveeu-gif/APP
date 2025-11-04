import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const EmployeeStatusCard = () => {
  return (
    <div className="card full-height">
      <div className="card-header-area flex-wrap mb-0">
        <h3 className="card-title mb-3">Employee Status</h3>
        <div>
          <select className="mb-3 webdesh-select right job-statistics-select">
            <option data-display="Filter & Short">Filter & Short</option>
            <option value="1">Monthly</option>
            <option value="2">Yearly</option>
          </select>
        </div>
      </div>

      <OverlayScrollbarsComponent>
        <table className="table employee-status-table table-centered table-nowrap">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Disipline</th>
              <th className="text-end">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex align-items-center">
                <img alt="" className="user-img" src="img/bg-img/u-1.jpg" />
                <span className="font-bold">Miles Tone</span>
              </td>
              <td>Marketing</td>
              <td>22</td>
              <td>+100%</td>
              <td className="text-end">
                <a className="table-btn success" href="#">
                  Permanent
                </a>
              </td>
            </tr>

            <tr>
              <td className="d-flex align-items-center">
                <img alt="" className="user-img" src="img/bg-img/u-2.jpg" />
                <span className="font-bold">Lance Bogrol</span>
              </td>
              <td>Finance</td>
              <td>35</td>
              <td>+100%</td>
              <td className="text-end">
                <a className="table-btn danger" href="#">
                  Contract
                </a>
              </td>
            </tr>

            <tr>
              <td className="d-flex align-items-center">
                <img alt="" className="user-img" src="img/bg-img/u-3.jpg" />
                <span className="font-bold">Elon Gated</span>
              </td>
              <td>Marketing</td>
              <td>28</td>
              <td>+100%</td>
              <td className="text-end">
                <a className="table-btn success" href="#">
                  Permanent
                </a>
              </td>
            </tr>

            <tr>
              <td className="d-flex align-items-center">
                <img alt="" className="user-img" src="img/bg-img/u-4.jpg" />
                <span className="font-bold">Dominic L. Emen</span>
              </td>
              <td>Designer</td>
              <td>25</td>
              <td>+100%</td>
              <td className="text-end">
                <a className="table-btn success" href="#">
                  Permanent
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </OverlayScrollbarsComponent>
    </div>
  );
};
export default EmployeeStatusCard;

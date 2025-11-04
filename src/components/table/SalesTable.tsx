const SalesTable = () => {
  return (
    <div className="card-three pb-0 bg-white full-height">
      <div className="card-header-area flex-wrap mb-0">
        <h3 className="card-title mb-3">Sales Analytics</h3>

        <div className="d-flex align-items-center mb-3">
          <p className="mb-1 me-2">Sort By</p>
          <select className="webdesh-select right sales-analytics-select">
            <option value="1">Weekly</option>
            <option value="1">Monthly</option>
            <option value="2">Quarterly</option>
          </select>
        </div>
      </div>

      <div className="table-responsive sales-analytics-table">
        <table className="table" id="salesAnalyticsTable">
          <thead>
            <tr>
              <th>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="11"
                      type="checkbox"
                      value=""
                    />
                    <label className="form-check-label" htmlFor="11"></label>
                  </div>
                  Location
                </div>
              </th>
              <th>Director</th>
              <th>PROGRESS</th>
              <th>DEADLINE</th>
              <th>Conversion</th>
              <th>Visiting</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox1"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox1"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-1.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "84%" }}
                    ></div>
                  </div>
                  <span className="ms-2">84%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="success-badge">In progress</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox2"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox2"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-2.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                  <span className="ms-2">87%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="success-badge">In progress</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox3"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox3"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-3.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <span className="ms-2">95%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="danger-badge">Not enough</span>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox4"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox4"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-4.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "58%" }}
                    ></div>
                  </div>
                  <span className="ms-2">58%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="success-badge">In progress</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox5"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox5"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-5.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "69%" }}
                    ></div>
                  </div>
                  <span className="ms-2">69%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="success-badge">In progress</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox6"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox6"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-6.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                  <span className="ms-2">89%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="danger-badge">Not enough</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="checkbox7"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox7"
                    ></label>
                  </div>
                  <span>Lviv Forum</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="me-2" src="./img/bg-img/t-7.jpg" alt="" />
                  <span>Nataly Chaplack</span>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "73%" }}
                    ></div>
                  </div>
                  <span className="ms-2">73%</span>
                </div>
              </td>
              <td>30/04/2023</td>
              <td>78.9%</td>
              <td>1289 people</td>
              <td>
                <span className="success-badge">In progress</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SalesTable;

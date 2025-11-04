import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const UpcomingScheduleCard = () => {
  return (
    <div className="announcement-card bg-white full-height">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <div className="card-title">
          <h3 className="mb-3">Upcoming Schedule</h3>
        </div>
        <select className="mb-3 webdesh-select right announcement-select">
          <option value="1">Today, 13 Sep 2024</option>
          <option value="2">Yesterday, 12 Sep 2024</option>
          <option value="3">11 Sep 2024</option>
        </select>
      </div>

      <OverlayScrollbarsComponent
        className="announcement-body"
        id="announcementBody"
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="schedule-tag">Priority</div>

        <div className="single-announcement">
          <div>
            <h6 className="mb-1">Review candidate applications</h6>
            <span>Today - 11.30 AM</span>
          </div>
          <div className="ms-2 toolbar d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle pe-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                    fill="#737B8B"
                  />
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    fill="#737B8B"
                  />
                  <path
                    d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                    fill="#737B8B"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="schedule-tag">Other</div>

        <div className="single-announcement">
          <div>
            <h6 className="mb-1">Interview with candidates</h6>
            <span>Today - 10.30 AM</span>
          </div>
          <div className="ms-2 toolbar d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle pe-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                    fill="#737B8B"
                  />
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    fill="#737B8B"
                  />
                  <path
                    d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                    fill="#737B8B"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="single-announcement">
          <div>
            <h6 className="mb-1">Interview with candidates</h6>
            <span>Today - 10.30 AM</span>
          </div>
          <div className="ms-2 toolbar d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle pe-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                    fill="#737B8B"
                  />
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    fill="#737B8B"
                  />
                  <path
                    d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                    fill="#737B8B"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-4"></div>
      </OverlayScrollbarsComponent>

      <a href="#" className="view-all-announcement">
        Creat a New Schedule
      </a>
    </div>
  );
};
export default UpcomingScheduleCard;

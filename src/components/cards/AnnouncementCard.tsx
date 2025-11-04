import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const AnnouncementCard = () => {
  return (
    <div className="announcement-card bg-white full-height">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <div className="card-title">
          <h3 className="mb-3">Announcement</h3>
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
        <div className="single-announcement">
          <div>
            <h6 className="mb-1">Outing schedule for every departement</h6>
            <span>5 Minutes ago</span>
          </div>
          <div className="ms-2 toolbar d-flex align-items-center">
            <a className="pin-on-this" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.9771 2.99999C14.0618 2.99983 14.1457 3.01637 14.224 3.04865C14.3022 3.08094 14.3734 3.12833 14.4333 3.18812L20.8119 9.56668C20.9327 9.6875 21.0005 9.85135 21.0005 10.0222C21.0005 10.193 20.9327 10.3569 20.8119 10.4777C20.1933 11.0962 19.4305 11.2354 18.8751 11.2354C18.647 11.2354 18.4434 11.2122 18.2823 11.1852L14.2439 15.2236C14.3502 15.652 14.4192 16.0887 14.4501 16.529C14.5093 17.4336 14.4088 18.7028 13.5223 19.5894C13.4014 19.7102 13.2376 19.778 13.0668 19.778C12.8959 19.778 12.7321 19.7102 12.6112 19.5894L8.96579 15.9452L4.86547 20.0455C4.6142 20.2968 3.29467 21.2079 3.0434 20.9566C2.79212 20.7053 3.70316 19.3845 3.95444 19.1345L8.05475 15.0342L4.4106 11.3888C4.28981 11.2679 4.22196 11.1041 4.22196 10.9332C4.22196 10.7624 4.28981 10.5985 4.4106 10.4777C5.29715 9.59116 6.56642 9.48936 7.47102 9.54993C7.91128 9.58077 8.34803 9.64976 8.77637 9.7561L12.8148 5.71893C12.7811 5.52269 12.7639 5.32399 12.7633 5.12488C12.7633 4.57079 12.9025 3.80794 13.5223 3.18812C13.643 3.06768 13.8066 3.00002 13.9771 2.99999Z"
                  fill="#737B8B"
                />
              </svg>
            </a>

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
            <h6 className="mb-1">Meeting HR Department</h6>
            <span>Yesterday, 12:30 PM</span>
          </div>
          <div className="ms-2 toolbar d-flex align-items-center">
            <a className="pin-on-this" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.9771 2.99999C14.0618 2.99983 14.1457 3.01637 14.224 3.04865C14.3022 3.08094 14.3734 3.12833 14.4333 3.18812L20.8119 9.56668C20.9327 9.6875 21.0005 9.85135 21.0005 10.0222C21.0005 10.193 20.9327 10.3569 20.8119 10.4777C20.1933 11.0962 19.4305 11.2354 18.8751 11.2354C18.647 11.2354 18.4434 11.2122 18.2823 11.1852L14.2439 15.2236C14.3502 15.652 14.4192 16.0887 14.4501 16.529C14.5093 17.4336 14.4088 18.7028 13.5223 19.5894C13.4014 19.7102 13.2376 19.778 13.0668 19.778C12.8959 19.778 12.7321 19.7102 12.6112 19.5894L8.96579 15.9452L4.86547 20.0455C4.6142 20.2968 3.29467 21.2079 3.0434 20.9566C2.79212 20.7053 3.70316 19.3845 3.95444 19.1345L8.05475 15.0342L4.4106 11.3888C4.28981 11.2679 4.22196 11.1041 4.22196 10.9332C4.22196 10.7624 4.28981 10.5985 4.4106 10.4777C5.29715 9.59116 6.56642 9.48936 7.47102 9.54993C7.91128 9.58077 8.34803 9.64976 8.77637 9.7561L12.8148 5.71893C12.7811 5.52269 12.7639 5.32399 12.7633 5.12488C12.7633 4.57079 12.9025 3.80794 13.5223 3.18812C13.643 3.06768 13.8066 3.00002 13.9771 2.99999Z"
                  fill="#737B8B"
                />
              </svg>
            </a>

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
            <h6 className="mb-1">
              IT Department need two more talents for UX/UI Designer position
            </h6>
            <span>Yesterday, 09:15 AM</span>
          </div>
          <div className="ms-2 toolbar d-flex align-items-center">
            <a className="pin-on-this" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.9771 2.99999C14.0618 2.99983 14.1457 3.01637 14.224 3.04865C14.3022 3.08094 14.3734 3.12833 14.4333 3.18812L20.8119 9.56668C20.9327 9.6875 21.0005 9.85135 21.0005 10.0222C21.0005 10.193 20.9327 10.3569 20.8119 10.4777C20.1933 11.0962 19.4305 11.2354 18.8751 11.2354C18.647 11.2354 18.4434 11.2122 18.2823 11.1852L14.2439 15.2236C14.3502 15.652 14.4192 16.0887 14.4501 16.529C14.5093 17.4336 14.4088 18.7028 13.5223 19.5894C13.4014 19.7102 13.2376 19.778 13.0668 19.778C12.8959 19.778 12.7321 19.7102 12.6112 19.5894L8.96579 15.9452L4.86547 20.0455C4.6142 20.2968 3.29467 21.2079 3.0434 20.9566C2.79212 20.7053 3.70316 19.3845 3.95444 19.1345L8.05475 15.0342L4.4106 11.3888C4.28981 11.2679 4.22196 11.1041 4.22196 10.9332C4.22196 10.7624 4.28981 10.5985 4.4106 10.4777C5.29715 9.59116 6.56642 9.48936 7.47102 9.54993C7.91128 9.58077 8.34803 9.64976 8.77637 9.7561L12.8148 5.71893C12.7811 5.52269 12.7639 5.32399 12.7633 5.12488C12.7633 4.57079 12.9025 3.80794 13.5223 3.18812C13.643 3.06768 13.8066 3.00002 13.9771 2.99999Z"
                  fill="#737B8B"
                />
              </svg>
            </a>

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

        <div className="mb-3"></div>
      </OverlayScrollbarsComponent>

      <a href="#" className="view-all-announcement">
        See All Announcement
      </a>
    </div>
  );
};
export default AnnouncementCard;

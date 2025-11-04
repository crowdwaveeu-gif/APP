import { countryData } from "../../data";
import WorldMap from "react-svg-worldmap";
import { useAppSelector } from "../../redux/hooks";

const UserOnlineCard = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <div className="card full-height">
      <div className="row align-items-center g-3">
        <div className="col-lg-8">
          <h3 className="card-title mb-3">Users Online at the Moment</h3>
          <div className="vector-map-area">
            <div className="height-300 overflow-hidden" id="OnlineUsersMaps">
              <WorldMap
                color="#0d6efd"
                size={430}
                data={countryData}
                borderColor={darkMode ? "#fff" : "#000"}
                backgroundColor={"transparent"}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="country-list-area">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="title mb-4">Top Countries</h6>
              <h6 className="title mb-4">Users</h6>
            </div>

            <div className="chart-county-list mb-4">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>Singapore</span>
                <span>192</span>
              </p>
              <div className="progress">
                <div className="progress-bar" style={{ width: "75%" }}></div>
              </div>
            </div>

            <div className="chart-county-list mb-4">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>China</span> <span>14</span>
              </p>
              <div className="progress">
                <div className="progress-bar" style={{ width: "64%" }}></div>
              </div>
            </div>

            <div className="chart-county-list mb-4">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>Hongkong</span> <span>11</span>
              </p>
              <div className="progress">
                <div className="progress-bar" style={{ width: "11%" }}></div>
              </div>
            </div>

            <div className="chart-county-list">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>India</span> <span>8</span>
              </p>
              <div className="progress">
                <div className="progress-bar" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserOnlineCard;

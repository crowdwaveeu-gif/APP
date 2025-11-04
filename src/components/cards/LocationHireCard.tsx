import WorldMap from "react-svg-worldmap";
import { useAppSelector } from "../../redux/hooks";
import { countryData } from "../../data";

const LocationHireCard = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <div className="card full-height location-hire-card">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h3 className="card-title mb-3">Hiring by Location</h3>
          <div className="vector-map-area">
            <div className="hiring-location-map" id="world-map-markers">
              <WorldMap
                color="#10b981"
                size={420}
                data={countryData}
                borderColor={darkMode ? "#fff" : "#000"}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="country-list-area">
            <h6 className="title mb-4">Top Countries</h6>

            <div className="chart-county-list mb-4">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>Singapore</span>
                <span>192</span>
              </p>
              <div className="progress green-op-1">
                <div
                  className="progress-bar bg-green"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="chart-county-list mb-4">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>China</span> <span>14</span>
              </p>
              <div className="progress green-op-1">
                <div
                  className="progress-bar bg-green"
                  style={{ width: "64%" }}
                ></div>
              </div>
            </div>

            <div className="chart-county-list mb-4">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>Hongkong</span> <span>11</span>
              </p>
              <div className="progress green-op-1">
                <div
                  className="progress-bar bg-green"
                  style={{ width: "11%" }}
                ></div>
              </div>
            </div>

            <div className="chart-county-list">
              <p className="mb-2 d-flex align-items-center justify-content-between">
                <span>India</span> <span>8</span>
              </p>
              <div className="progress green-op-1">
                <div
                  className="progress-bar bg-green"
                  style={{ width: "8%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationHireCard;

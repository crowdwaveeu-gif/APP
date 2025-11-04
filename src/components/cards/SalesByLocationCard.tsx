import WorldMap from "react-svg-worldmap";
import { countryData } from "../../data";
import { useAppSelector } from "../../redux/hooks";

const SalesByLocationCard = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <div className="card-five bg-white full-height">
      <div className="row">
        <div className="col-12">
          <div className="card-header-area flex-wrap mb-0">
            <h3 className="card-title mb-3">Sales by Location</h3>
            <div className="mb-3 d-flex align-items-center">
              <p className="mb-1 me-2">Sort By:</p>
              <select className="webdesh-select fw-bold right transaction-statistics-select border-0 ps-0">
                <option value="1">World</option>
                <option value="2">USA</option>
                <option value="3" disabled>
                  Asia
                </option>
              </select>
            </div>
          </div>

          <div className="vector-map-area mt-2">
            <div id="world-map-sales-markers">
              <WorldMap
                color="#a9bdff"
                size={500}
                data={countryData}
                borderColor={darkMode ? "#fff" : "#000"}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="country-list-area">
            <div className="chart-county-list">
              <div className="d-flex align-items-center justify-content-between">
                <span>USA</span>
                <span>75%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar primary-bg"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="chart-county-list">
              <div className="d-flex align-items-center justify-content-between">
                <span>Russia</span>
                <span>55%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar primary-bg"
                  style={{ width: "55%" }}
                ></div>
              </div>
            </div>

            <div className="chart-county-list">
              <div className="d-flex align-items-center justify-content-between">
                <span>Australia</span>
                <span>85%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar primary-bg"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SalesByLocationCard;

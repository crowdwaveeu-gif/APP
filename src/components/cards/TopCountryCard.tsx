import { countryData } from "../../data";
import WorldMap from "react-svg-worldmap";
import { useAppSelector } from "../../redux/hooks";

const TopCountryCard = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <div className="card full-height top-country-card">
      <div className="d-flex mb-4 top-countries-header align-items-center flex-wrap justify-content-between">
        <h5 className="mb-0">Top Countries</h5>

        <select className="webdesh-select right shipment-statistics-select">
          <option value="1">Last 7 days</option>
          <option value="1">Last 15 days</option>
          <option value="2">Last 30 days</option>
        </select>
      </div>

      <div className="top-countries-maps overflow-hidden">
        <div id="topCountries">
          <WorldMap
            color="#1A83FE"
            size={520}
            data={countryData}
            borderColor={darkMode ? "#fff" : "#000"}
            backgroundColor="transparent"
          />
        </div>
      </div>

      <div className="top-countries-list border-top pt-4">
        <div className="chart-county-list d-flex align-items-center">
          <div className="country-name d-flex align-items-center">
            <span className="fi fi-us"></span>
            <p className="mb-0 ms-2">United States</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: "75%" }}>
              75%
            </div>
          </div>
        </div>

        <div className="chart-county-list d-flex align-items-center">
          <div className="country-name d-flex align-items-center">
            <span className="fi fi-ca"></span>
            <p className="mb-0 ms-2">Canada</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: "56%" }}>
              56%
            </div>
          </div>
        </div>

        <div className="chart-county-list d-flex align-items-center">
          <div className="country-name d-flex align-items-center">
            <span className="fi fi-fr"></span>
            <p className="mb-0 ms-2">France</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: "44%" }}>
              44%
            </div>
          </div>
        </div>

        <div className="chart-county-list d-flex align-items-center">
          <div className="country-name d-flex align-items-center">
            <span className="fi fi-it"></span>
            <p className="mb-0 ms-2">Italy</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: "38%" }}>
              38%
            </div>
          </div>
        </div>

        <div className="chart-county-list d-flex align-items-center">
          <div className="country-name d-flex align-items-center">
            <span className="fi fi-au"></span>
            <p className="mb-0 ms-2">Australia</p>
          </div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "20%" }}
            >
              20%
            </div>
          </div>
        </div>

        <div className="chart-county-list d-flex align-items-center">
          <div className="country-name d-flex align-items-center">
            <span className="fi fi-in"></span>
            <p className="mb-0 ms-2">India</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: "17%" }}>
              17%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopCountryCard;

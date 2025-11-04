import WorldMap from "react-svg-worldmap";
import { useAppSelector } from "../../redux/hooks";
import { countryData } from "../../data";

const MonthlyCard = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <div className="card-three bg-white full-height">
      <div className="map-area">
        <div className="card-header-three">
          <div className="card-header-three-title">
            <h3 className="mb-0">Implementation of the monthly plan</h3>
          </div>
          <a className="download-btn" href="#" download="">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.875 19.875H18.375M5.625 10.125L11.625 15.375L17.625 10.125M11.625 2.625V15.375"
                stroke="#5D5FEF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="world-map-area">
        <div id="world-map-markers">
          <WorldMap
            color="#10b981"
            size={597}
            data={countryData}
            borderColor={darkMode ? "#fff" : "#000"}
          />
        </div>
        <div className="map-bottom-list">
          <ul>
            <li>
              <svg
                fill="none"
                height="6"
                viewBox="0 0 6 6"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="3" cy="3" fill="#5D5FEF" rx="3" ry="3" />
              </svg>
              89%
            </li>

            <li>
              <svg
                fill="none"
                height="6"
                viewBox="0 0 7 6"
                width="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="3.5506" cy="3" fill="#10B981" rx="3" ry="3" />
              </svg>
              60%
            </li>

            <li>
              <svg
                fill="none"
                height="6"
                viewBox="0 0 7 6"
                width="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.10083"
                  cy="2.99999"
                  fill="#4D515A"
                  rx="3"
                  ry="3"
                />
              </svg>
              48%
            </li>

            <li>
              <svg
                fill="none"
                height="6"
                viewBox="0 0 7 6"
                width="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.65741"
                  cy="2.99951"
                  fill="#E11D48"
                  rx="3"
                  ry="3"
                />
              </svg>
              70%
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default MonthlyCard;

/**
 * ⚠️ HARDCODED WEB ANALYTICS DATA - NOT USED
 * 
 * This component shows hardcoded website visit statistics by country.
 * Not relevant for courier/logistics operations.
 * 
 * TO USE FOR COURIER PRODUCT:
 * Repurpose for logistics metrics such as:
 * - Deliveries by City/Region (e.g., Lagos, Abuja, Port Harcourt)
 * - Active Delivery Zones
 * - Top Performing Routes
 * - Regional Package Distribution
 * 
 * Replace country flags with city/region icons and integrate with Firebase
 * to show real delivery statistics per location.
 */
const VisitedCountryCard = () => {
  return (
    <div className="card full-height">
      <div className="mb-4 card-header-content d-flex align-items-center justify-content-between flex-wrap">
        <div className="me-4">
          <h6 className="mb-1">Visits by Country</h6>
          <p className="mb-0">20 countries share 97% visits</p>
        </div>
        <button className="btn btn-lean">View All</button>
      </div>

      <div className="visitor-by-country-wrap">
        <div className="single-visitor-by-country d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="country-flaq">
              <span className="fi fi-us fis"></span>
            </div>
            <div className="country-name">
              <p className="mb-1">United States</p>
              <span>Direct link clicks</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 visitor-numbers">9,763</p>
            <span className="status increase">
              <i className="ti ti-arrow-up"></i>
              2.6%
            </span>
          </div>
        </div>

        <div className="single-visitor-by-country d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="country-flaq">
              <span className="fi fi-br fis"></span>
            </div>
            <div className="country-name">
              <p className="mb-1">Brasil</p>
              <span>All Social Channels</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 visitor-numbers">4,062</p>
            <span className="status decrease">
              <i className="ti ti-arrow-down"></i>
              0.4%
            </span>
          </div>
        </div>

        <div className="single-visitor-by-country d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="country-flaq">
              <span className="fi fi-tr fis"></span>
            </div>
            <div className="country-name">
              <p className="mb-1">Turkey</p>
              <span>Mailchimp Campaigns</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 visitor-numbers">1,680</p>
            <span className="status increase">
              <i className="ti ti-arrow-up"></i>
              0.2%
            </span>
          </div>
        </div>

        <div className="single-visitor-by-country d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="country-flaq">
              <span className="fi fi-fr fis"></span>
            </div>
            <div className="country-name">
              <p className="mb-1">France</p>
              <span>Impact Radius visits</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 visitor-numbers">849</p>
            <span className="status increase">
              <i className="ti ti-arrow-up"></i>
              4.1%
            </span>
          </div>
        </div>

        <div className="single-visitor-by-country d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="country-flaq">
              <span className="fi fi-in fis"></span>
            </div>
            <div className="country-name">
              <p className="mb-1">India</p>
              <span>Many Sources</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 visitor-numbers">604</p>
            <span className="status decrease">
              <i className="ti ti-arrow-down"></i>
              8.3%
            </span>
          </div>
        </div>

        <div className="single-visitor-by-country d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="country-flaq">
              <span className="fi fi-se fis"></span>
            </div>
            <div className="country-name">
              <p className="mb-1">Sweden</p>
              <span>Social Network</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 visitor-numbers">237</p>
            <span className="status increase">
              <i className="ti ti-arrow-up"></i>
              1.9%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisitedCountryCard;

import { useState } from "react";

const PrivateInfoSection = () => {
  const [id, setId] = useState<string>("1D233");
  const [email, setEmail] = useState<string>("example@mail.com");
  const [phone, setPhone] = useState<string>("+0 123 456 789");
  const [url, setUrl] = useState<string>("https://themeforest.net/");
  const [location, setLocation] = useState<string>("California, United States");
  return (
    <div className="private-information mb-4">
      <div className="row g-3">
        <div className="col-12 col-lg-4 col-sm-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-light fa-user"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Unique ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-lg-4 col-sm-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text">
              <i className="fa-light fa-user-tie"></i>
            </span>
            <select className="form-control select-search">
              <option value="">Role</option>
              <option value="0">Admin</option>
              <option value="1">Manager</option>
              <option value="2">Project Manager</option>
              <option value="3">Managing Director</option>
              <option value="4">Chairman</option>
              <option value="5">Graphic Designer</option>
            </select>
          </div>
        </div>

        <div className="col-12 col-lg-4 col-sm-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text">
              <i className="fa-light fa-circle-check"></i>
            </span>
            <select className="form-control">
              <option value="">Status</option>
              <option value="0">Enable</option>
              <option value="1">Disable</option>
            </select>
          </div>
        </div>

        <div className="col-12 col-lg-4 col-sm-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-light fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-lg-4 col-sm-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-light fa-phone"></i>
            </span>
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-lg-4 col-sm-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-light fa-globe"></i>
            </span>
            <input
              type="url"
              className="form-control"
              placeholder="Website"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12">
          <textarea
            className="form-control h-100-p"
            placeholder="Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default PrivateInfoSection;

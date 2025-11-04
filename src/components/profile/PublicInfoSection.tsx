import { useState } from "react";

const PublicInfoSection = () => {
  const [name, setName] = useState<string>("Mitchell C. Shay");
  const [userName, setUserName] = useState<string>("@mitchellc");
  const [desc, setDesc] = useState<string>(
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
  );
  return (
    <div className="public-information mb-4">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="admin-profile mb-5">
            <div className="image-wrap">
              <div className="part-img rounded-circle overflow-hidden">
                <img src="/img/bg-img/admin.png" alt="admin" />
              </div>
              <button className="image-change">
                <i className="fa-light fa-camera"></i>
              </button>
            </div>
            <span className="admin-name">Mitchell C. Shay</span>
            <span className="admin-role">Graphic Designer</span>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row g-3">
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-light fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-light fa-at"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <textarea
                className="form-control h-150-p"
                placeholder="Biography"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PublicInfoSection;

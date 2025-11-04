import { useState } from "react";
import DatePicker from "react-datepicker";

const PublishedProduct = () => {
  const [publishedBtn, setPublishedBtn] = useState<boolean>(false);
  const [publishDate, setPublishDate] = useState<Date | null>(null);

  const handlePublishedBtn = () => {
    setPublishedBtn((prevPublishedBtn) => !prevPublishedBtn);
  };

  const handleDateChange = (date: Date | null) => {
    setPublishDate(date);
  };
  return (
    <div className="panel mb-4">
      <div className="panel-header">
        <h5>Published</h5>
        <div className="btn-box d-flex gap-2">
          <button className="btn btn-sm btn-icon btn-primary">
            <i className="fa-light fa-arrows-rotate"></i>
          </button>
          <button
            className="btn btn-sm btn-icon btn-primary panel-close"
            onClick={handlePublishedBtn}
          >
            <i className="fa-light fa-angle-up"></i>
          </button>
        </div>
      </div>
      <div className={`panel-body ${publishedBtn ? "d-none" : ""}`}>
        <div className="row g-3">
          <div className="col-6">
            <label className="form-label">Status</label>
            <select className="form-control">
              <option value="0">Published</option>
              <option value="1">Draft</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label">Visibility</label>
            <select className="form-control">
              <option value="0">Public</option>
              <option value="1">Pass. Protected</option>
              <option value="2">Private</option>
            </select>
          </div>
          <div className="col-12">
            <div className="publish-date mb-30">
              <label>
                Published on:
                <DatePicker
                  className="input-flush"
                  selected={publishDate}
                  onChange={handleDateChange}
                  closeOnScroll={true}
                  id="publishDate"
                />
              </label>
              <label
                htmlFor="publishDate"
                className="cursor-pointer text-primary"
              >
                <i className="fa-light fa-pen-to-square"></i>
              </label>
            </div>
            <div className="btn-box d-flex justify-content-end gap-2">
              <button className="btn btn-sm btn-outline-primary">Save</button>
              <button className="btn btn-sm btn-primary">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishedProduct;

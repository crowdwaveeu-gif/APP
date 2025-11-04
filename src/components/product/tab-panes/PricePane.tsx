import { useState } from "react";

import DatePicker from "react-datepicker";
const PricePane = () => {
  const [joiningDate, setJoiningDate] = useState<Date | null>(null);
  const [leaveDate, setLeaveDate] = useState<Date | null>(null);
  return (
    <form>
      <div className="row g-3 mb-3">
        <label
          htmlFor="regularPrice"
          className="col-md-2 col-form-label col-form-label-sm"
        >
          Regular Price ($)
        </label>
        <div className="col-md-10">
          <input type="number" className="form-control" id="regularPrice" />
        </div>
      </div>
      <div className="row g-3 mb-3">
        <label
          htmlFor="salePrice"
          className="col-md-2 col-form-label col-form-label-sm"
        >
          Discount ($)
        </label>
        <div className="col-md-8">
          <input type="number" className="form-control" id="salePrice" />
        </div>
        <div className="col-md-2">
          <div className="form-control-sm p-0">
            <select className="form-control">
              <option value="1">Flat</option>
              <option value="2">Discount</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <label
          htmlFor="PriceDateStart"
          className="col-md-2 col-form-label col-form-label-sm"
        >
          Sale price dates
        </label>
        <div className="col-md-5">
          <DatePicker
            className="form-control date-picker"
            selected={joiningDate}
            onChange={(date: Date | null) => setJoiningDate(date)}
            placeholderText="dd mmm, yy"
          />
        </div>
        <div className="col-md-5">
          <DatePicker
            className="form-control date-picker"
            selected={leaveDate}
            onChange={(date: Date | null) => setLeaveDate(date)}
            placeholderText="dd mmm, yy"
          />
        </div>
      </div>
    </form>
  );
};

export default PricePane;

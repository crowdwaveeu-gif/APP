import DatePicker from "react-datepicker";
import { useState } from "react";

const PersonalInformationForm = () => {
  const [joiningDate, setJoiningDate] = useState<Date | null>(null);
  const [leaveDate, setLeaveDate] = useState<Date | null>(null);

  const handleJoiningDateChange = (ranges: any) => {
    const { selection } = ranges;
    if (selection.endDate && joiningDate && selection.endDate > joiningDate) {
      // Prevent setting joining date later than leaving date
      alert("Joining date cannot be later than leaving date.");
      return;
    }
    // Here you may want to extract the start or end date from the ranges object
    // and set the joining date accordingly
    setJoiningDate(selection.startDate);
  };

  const handleLeaveDateChange = (date: Date) => {
    if (joiningDate && date < joiningDate) {
      // Prevent setting leaving date earlier than joining date
      alert("Leaving date cannot be earlier than joining date.");
      return;
    }
    setLeaveDate(date);
  };
  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Personal Information</h5>
      </div>
      <div className="panel-body">
        <div className="row g-3">
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Department</label>
            <select
              className="form-control "
              data-placeholder="Choose Department"
            >
              <option value="">Choose Department</option>
              <option value="0">Department 1</option>
              <option value="1">Department 2</option>
              <option value="2">Department 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Section</label>
            <select className="form-control " data-placeholder="Choose Section">
              <option value="">Choose Section</option>
              <option value="0">Section 1</option>
              <option value="1">Section 2</option>
              <option value="2">Section 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Sub Section</label>
            <select
              className="form-control "
              data-placeholder="Choose Subsection"
            >
              <option value="">Choose Subsection</option>
              <option value="0">Subsection 1</option>
              <option value="1">Subsection 2</option>
              <option value="2">Subsection 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Designation</label>
            <select
              className="form-control "
              data-placeholder="Choose Designation"
            >
              <option value="">Choose Designation</option>
              <option value="0">Designation 1</option>
              <option value="1">Designation 2</option>
              <option value="2">Designation 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Employee Type</label>
            <select
              className="form-control "
              data-placeholder="Choose Employee Type"
            >
              <option value="">Choose Employee Type</option>
              <option value="0">Employee Type 1</option>
              <option value="1">Employee Type 2</option>
              <option value="2">Employee Type 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Duty Type</label>
            <select
              className="form-control "
              data-placeholder="Choose Duty Type"
            >
              <option value="">Choose Duty Type</option>
              <option value="0">Duty Type 1</option>
              <option value="1">Duty Type 2</option>
              <option value="2">Duty Type 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Joining Date</label>
            <DatePicker
              placeholderText="dd mmm, yy"
              className="form-control  date-picker"
              id="editTaskStartDate"
              selected={joiningDate}
              onChange={handleJoiningDateChange}
            />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Leave / Expire Date</label>
            <DatePicker
              placeholderText="dd mmm, yy"
              className="form-control date-picker"
              selected={leaveDate}
              onChange={handleLeaveDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalInformationForm;

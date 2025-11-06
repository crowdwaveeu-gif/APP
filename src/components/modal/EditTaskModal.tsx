import Select from "react-select";
import { editTaskModalOptions } from "../../data";
import DynamicEditor from "../editor/DynamicEditor";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleEditTaskModalClose } from "../../redux/features/editTaskModalSlice";
import { toast } from 'react-toastify';

const EditTaskModal = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  const [taskName, setTaskName] = useState<string>("Web Design & Development");
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.editTaskModal.isModalOpen);
  const closeModal = () => {
    dispatch(toggleEditTaskModalClose());
  };
  const [joiningDate, setJoiningDate] = useState<Date | null>(null);
  const [leaveDate, setLeaveDate] = useState<Date | null>(null);

  const handleJoiningDateChange = (ranges: any) => {
    const { selection } = ranges;
    if (selection.endDate && joiningDate && selection.endDate > joiningDate) {
      // Prevent setting joining date later than leaving date
      toast.error("Joining date cannot be later than leaving date.");
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
    <>
      <div
        className={`ar-modal-overlay ${modalOpen ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`edit-task-modal-container ar-modal ${
          modalOpen ? "active" : ""
        }`}
      >
        <div className="ar-modal-content">
          <div className="edit-task-modal-header">
            <h2>Edit Task</h2>
            <button
              className="btn btn-sm btn-icon btn-outline-primary"
              onClick={closeModal}
            >
              <i className="fa-light fa-times"></i>
            </button>
          </div>
          <div className="edit-task-modal-body">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="editTaskName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="editTaskName"
                  className="form-control"
                  placeholder="Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="editTaskAttchment" className="form-label">
                  Attach File
                </label>
                <input
                  type="file"
                  id="editTaskAttchment"
                  className="form-control"
                  multiple
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="editTaskStartDate" className="form-label">
                  Start Date
                </label>
                <DatePicker
                  placeholderText="Eg: 12 Feb, 20"
                  className="form-control date-picker"
                  id="editTaskStartDate"
                  selected={joiningDate}
                  onChange={handleJoiningDateChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="editTaskEndDate" className="form-label">
                  End Date
                </label>
                <DatePicker
                  placeholderText="Eg: 12 Feb, 20"
                  className="form-control date-picker"
                  selected={leaveDate}
                  onChange={handleLeaveDateChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Priority</label>
                <select className="form-control">
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Repeat every</label>
                <select className="form-control" data-placeholder="Select Time">
                  <option value="">Select Time</option>
                  <option value="week">Week</option>
                  <option value="2week">2 Weeks</option>
                  <option value="month">1 Month</option>
                  <option value="2months">2 Months</option>
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="year">1 Year</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Assign To</label>
                <Select
                  isMulti
                  options={editTaskModalOptions}
                  placeholder="Eg: Natasha Hancock"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "transparent",
                      color: darkMode ? "#c4c4c4" : "#222222",
                      fontSize: 14,
                      borderColor: darkMode
                        ? "rgba(255, 255, 255, 0.12)"
                        : "#dbeaea",
                    }),
                  }}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Task Description</label>
                <DynamicEditor />
              </div>
            </div>
          </div>
          <div className="edit-task-modal-footer">
            <button className="btn btn-sm btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button className="btn btn-sm btn-primary" onClick={closeModal}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditTaskModal;

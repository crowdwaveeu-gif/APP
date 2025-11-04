import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import DynamicEditor from "../editor/DynamicEditor";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleAddTaskModalClose } from "../../redux/features/addTaskModalSlice";
import { editTaskModalOptions } from "../../data";

const AddTaskModal = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.isDark);

  const activeModal = useAppSelector((state) => state.addTaskModal.isModalOpen);
  const closeModal = () => {
    dispatch(toggleAddTaskModalClose());
  };
  const [joiningDate, setJoiningDate] = useState<Date | null>(null);
  const [leaveDate, setLeaveDate] = useState<Date | null>(null);

  const handleJoiningDateChange = (date: Date) => {
    if (leaveDate && date > leaveDate) {
      // Prevent setting joining date later than leaving date
      alert("Joining date cannot be later than leaving date.");
      return;
    }
    setJoiningDate(date);
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
        className={`ar-modal-overlay ${activeModal ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`add-new-task-modal ar-modal ${activeModal ? "active" : ""}`}
      >
        <div className="ar-modal-content">
          <div className="add-new-task-modal-header">
            <h2 id="addTaskModalLabel">Add New Task</h2>
            <button
              className="btn btn-sm btn-icon btn-light"
              onClick={closeModal}
            >
              <i className="fa-light fa-times"></i>
            </button>
          </div>
          <div className="add-new-task-modal-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Task Name"
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Attach File</label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  id="addTaskAttchment"
                />
              </div>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">Start Date</label>
                  <DatePicker
                    placeholderText="Eg: 12/06/2023"
                    className="form-control  date-picker hasDatepicker"
                    selected={joiningDate}
                    onChange={handleJoiningDateChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">End Date</label>
                  <DatePicker
                    placeholderText="Eg: 12/06/2023"
                    className="form-control  date-picker hasDatepicker"
                    selected={leaveDate}
                    onChange={handleLeaveDateChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Priority</label>
                  <select className="form-select">
                    <option>Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Repeat every</label>
                  <select className="form-select">
                    <option>Select Time</option>
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
          </div>
          <div className="add-new-task-modal-footer">
            <button className="btn btn-sm btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button className="btn btn-sm btn-success" onClick={closeModal}>
              Save Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTaskModal;

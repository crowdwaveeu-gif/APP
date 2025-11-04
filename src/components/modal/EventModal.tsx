import { useState } from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
  handleSaveEvent: (title: string, category: string) => void;
};

const EventModal = ({ show, handleClose, handleSaveEvent }: Props) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const handleSave = () => {
    handleSaveEvent(eventTitle, eventCategory);
    handleClose();
    setEventTitle("");
    setEventCategory("");
  };

  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="button"
        onClick={handleClose}
      ></div>
      <div className={`event-modal-container ${show ? "active" : ""}`}>
        <div className="event-modal-header">
          <h4>Add New Event</h4>
        </div>
        <div className="event-modal-body">
          <div className="row g-3">
            <div className="col-12">
              <div>
                <label className="control-label form-label">Event Name</label>
                <input
                  className="form-control"
                  placeholder="Set Event Name"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid event name
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="control-label form-label">Category</label>
                <select
                  className="form-control"
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="bg-primary">Primary</option>
                  <option value="bg-danger">Danger</option>
                  <option value="bg-success">Success</option>
                  <option value="bg-info">Info</option>
                  <option value="bg-dark">Dark</option>
                  <option value="bg-warning">Warning</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid event category
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-modal-footer">
          <button className="btn btn-sm btn-light me-2" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-sm btn-success" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EventModal;

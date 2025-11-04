type Props = {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};
const DeleteConfirmationModal = ({
  show,
  handleClose,
  handleDelete,
}: Props) => {
  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="button"
        onClick={handleClose}
      ></div>
      <div className={`delete-event-modal-container ${show ? "active" : ""}`}>
        <div className="delete-event-modal-header">
          <h4>Confirm Delete</h4>
        </div>
        <div className="delete-event-modal-body">
          <p className="delete-confirmation">
            Are you sure you want to delete the event?
          </p>
        </div>
        <div className="delete-event-modal-footer">
          <button className="btn btn-sm btn-light me-2" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;

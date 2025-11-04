import { toggleCreateFolderModalClose } from "../../redux/features/createFolderModalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const CreateFolderModal = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(
    (state) => state.createFolderModal.isModalOpen
  );

  const closeModal = () => {
    dispatch(toggleCreateFolderModalClose());
  };
  return (
    <>
      <div
        className={`ar-modal-overlay ${activeModal ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`create-folder-modal-container ${
          activeModal ? "active" : ""
        }`}
      >
        <div className="create-folder-modal-header">
          <h3>Create New Folder</h3>
          <button
            className="btn btn-sm btn-outline-primary btn-icon"
            onClick={closeModal}
          >
            <i className="fa-light fa-xmark"></i>
          </button>
        </div>
        <div className="create-folder-modal-body">
          <form>
            <label htmlFor="newFolderName">Folder Name</label>
            <input
              type="text"
              id="newFolderName"
              placeholder="Enter Folder Name"
              className="form-control mt-1"
              required
            />
          </form>
        </div>
        <div className="create-folder-modal-footer">
          <button onClick={closeModal} className="btn btn-sm btn-secondary">
            Close
          </button>
          <button className="btn btn-sm btn-success ms-2">Create</button>
        </div>
      </div>
    </>
  );
};
export default CreateFolderModal;

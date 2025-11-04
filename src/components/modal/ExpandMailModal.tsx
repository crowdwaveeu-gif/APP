import { toggleExpandMailModalClose } from "../../redux/features/expandMailModalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import EmailDetails from "../email/EmailDetails";

const ExpandMailModal = () => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggleExpandMailModalClose());
  };
  const activeModal = useAppSelector(
    (state) => state.expandMailModal.isModalOpen
  );
  return (
    <>
      <div
        className={`ar-modal-overlay ${activeModal ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`expand-mail-modal-container ${activeModal ? "active" : ""}`}
      >
        <EmailDetails closeModal={closeModal} />
      </div>
    </>
  );
};
export default ExpandMailModal;

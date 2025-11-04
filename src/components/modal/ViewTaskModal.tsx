import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleViewTaskModalClose } from "../../redux/features/viewTaskModalSlice";

const ViewTaskModal = () => {
  const dispatch = useAppDispatch();
  const openModal = useAppSelector((state) => state.viewTaskModal.isModalOpen);
  const toggleClose = () => {
    dispatch(toggleViewTaskModalClose());
  };
  return (
    <>
      <div
        className={`ar-modal-overlay ${openModal ? "active" : ""}`}
        role="button"
        onClick={toggleClose}
      ></div>
      <div
        className={`view-task-modal ar-modal ${openModal ? "active" : ""}`}
        id="viewTaskModal"
      >
        <div className="ar-modal-content">
          <div className="view-task-modal-header">
            <h2 id="viewTaskModalLabel">Web Design & Development</h2>
            <div className="btn-box d-flex gap-3">
              <button className="btn-flush text-info">
                <i className="fa-light fa-edit"></i>
              </button>
              <button className="btn-flush text-danger">
                <i className="fa-light fa-trash-can"></i>
              </button>
              <button
                type="button"
                className="btn btn-sm btn-icon btn-outline-primary"
                onClick={toggleClose}
              >
                <i className="fa-light fa-times"></i>
              </button>
            </div>
          </div>
          <div className="view-task">
            <div className="row g-3">
              <div className="col-lg-8 col-md-7">
                <span className="task-created">
                  <i className="fa-light fa-clock"></i> Created at 16/02/2023
                  03:20:50 by <Link to="/profile">Admin</Link>
                </span>
                <div className="task-dscr">
                  <h6 className="dscr-title">Description</h6>
                  <p>
                    Et quo odio aut aut natus facere consequatur eius. Eos non
                    enim repudiandae voluptatem. Animi libero illo tempora. Id
                    ut autem quis omnis fuga. Enim est reiciendis et. Ipsam
                    autem maxime culpa quos. Velit reiciendis eos saepe. Nemo ut
                    officiis dolores sequi error cum eum facilis. Praesentium
                    porro porro ipsa nihil ipsum rerum sint. Sit omnis
                    consequatur consequatur voluptates ipsa. Quam in occaecati
                    alias sapiente voluptas eveniet. Consequuntur non deserunt
                    exercitationem amet.
                  </p>
                  <h6 className="dscr-title">Attachment</h6>
                  <div className="task-attachment">
                    <div className="attched-box">
                      <img src="/img/bg-img/product-img-1.jpg" alt="Image" />
                    </div>
                    <button className="btn btn-sm btn-primary w-100">
                      Download All (1)
                    </button>
                  </div>
                </div>
                <div className="comments">
                  <h6>Comments</h6>
                  <div className="add-a-comment">
                    <textarea
                      className="form-control form-control-sm mb-15"
                      rows={3}
                      placeholder="Add a comment here..."
                    ></textarea>
                    <div className="btn-box d-flex justify-content-end">
                      <button className="btn btn-sm btn-primary">Submit</button>
                    </div>
                  </div>
                  <div className="single-comment">
                    <button className="btn-flush text-danger comment-delete">
                      <i className="fa-light fa-trash-can"></i>
                    </button>
                    <div className="avatar">
                      <img src="/img/bg-img/admin.png" alt="Image" />
                    </div>
                    <div className="part-txt">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat laborum, minus iste nam deleniti enim eveniet
                        illum tempore hic non quam id voluptates veniam ullam
                        inventore autem odit, recusandae earum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5">
                <div className="task-info-box">
                  <h6>Task Info:</h6>
                  <ul>
                    <li>
                      <span className="part-icon">
                        <i className="fa-light fa-calendar"></i>
                      </span>
                      Start Date: 12 Feb, 2023
                    </li>
                    <li>
                      <span className="part-icon">
                        <i className="fa-light fa-calendar-check"></i>
                      </span>
                      End Date: 12 Mar, 2023
                    </li>
                    <li>
                      <span className="part-icon">
                        <i className="fa-light fa-star"></i>
                      </span>
                      Status:
                      <span className="badge bg-primary p-1 rounded">
                        Not Started
                      </span>
                    </li>
                    <li>
                      <span className="part-icon">
                        <i className="fa-light fa-bolt"></i>
                      </span>
                      Priority:
                      <span className="badge bg-success p-1 rounded">Low</span>
                    </li>
                  </ul>
                </div>
                <div className="task-info-box">
                  <h6>Assigned To</h6>
                  <ul>
                    <li>Harrison French</li>
                    <li>Isabel Mellor</li>
                    <li>Adam Bates</li>
                    <li>Kai Barker</li>
                  </ul>
                </div>
                <div className="task-info-box">
                  <h6>Reminders</h6>
                  <ul>
                    <li>2 Weeks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTaskModal;

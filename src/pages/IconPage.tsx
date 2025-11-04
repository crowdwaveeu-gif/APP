import { toast } from "react-toastify";
import { iconsData } from "../data";

const IconPage = () => {
  const handleCopy = (iclassname: string) => {
    navigator.clipboard
      .writeText(`<i className="${iclassname}"></i>`)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!", err);
      });
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <h5>Font Awesome 6</h5>
          </div>
          <div className="panel-body">
            <div className="row icon-row g-3">
              {iconsData.map((item) => (
                <div className="icon-col col-6 col-sm-4 col-lg-3" key={item.id}>
                  <div className="icon-box">
                    <button
                      className="btn-flush copy-icon"
                      onClick={() => handleCopy(item.iclassname)}
                    >
                      <i className="fa-light fa-clone"></i>
                    </button>
                    <span className="icon">
                      <i className={item.iclassname}></i>
                    </span>
                    <span className="icon-name">{item.name}</span>
                  </div>
                </div>
              ))}

              <div className="w-100 text-center">
                <a
                  href="https://fontawesome.com/"
                  target="_blank"
                  className="btn btn-sm btn-primary"
                >
                  See More Icons <i className="fa-light fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IconPage;

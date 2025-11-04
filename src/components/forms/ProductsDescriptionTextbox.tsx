import { useState } from "react";
import DynamicEditor from "../editor/DynamicEditor";

const ProductsDescriptionTextbox = () => {
  const [descriptionBtn, setDescriptionBtn] = useState(false);

  const handleDescriptionBtn = () => {
    setDescriptionBtn(!descriptionBtn);
  };
  return (
    <div className="panel mb-4">
      <div className="panel-header">
        <h5>Product Description</h5>
        <div className="btn-box d-flex gap-2">
          <button className="btn btn-sm btn-icon btn-primary">
            <i className="fa-light fa-arrows-rotate"></i>
          </button>
          <button
            className="btn btn-sm btn-icon btn-primary panel-close"
            onClick={handleDescriptionBtn}
          >
            <i className="fa-light fa-angle-up"></i>
          </button>
        </div>
      </div>
      <div className={`panel-body ${descriptionBtn ? "d-none" : ""}`}>
        <DynamicEditor />
      </div>
    </div>
  );
};
export default ProductsDescriptionTextbox;

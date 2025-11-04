import { useState } from "react";

const ProductTitleForm = () => {
  const [title, setTitle] = useState<string>("");
  const [permalink, setPermalink] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
    generatePermalink(value);
  };

  const generatePermalink = (value: string) => {
    const formattedTitle = value.toLowerCase().replace(/\s+/g, "-");
    setPermalink(`https://example.com/${formattedTitle}`);
  };

  const handleEditPermalink = () => {
    const editPermalinkInput = document.getElementById(
      "editPermalink"
    ) as HTMLInputElement;
    if (editPermalinkInput) {
      editPermalinkInput.value = permalink;
      editPermalinkInput.hidden = false;
      const editPermaBtn = document.getElementById("editPermaBtn");
      const createPerma = document.getElementById("createPerma");
      const cancelPerma = document.getElementById("cancelPerma");
      if (editPermaBtn && createPerma && cancelPerma) {
        editPermaBtn.hidden = true;
        createPerma.hidden = false;
        cancelPerma.hidden = false;
      }
    }
  };

  const handleUpdatePermalink = () => {
    const updatedPermalink = (
      document.getElementById("editPermalink") as HTMLInputElement
    ).value;
    setPermalink(updatedPermalink);
    const editPermalinkInput = document.getElementById(
      "editPermalink"
    ) as HTMLInputElement;
    if (editPermalinkInput) {
      editPermalinkInput.hidden = true;
      const editPermaBtn = document.getElementById("editPermaBtn");
      const createPerma = document.getElementById("createPerma");
      const cancelPerma = document.getElementById("cancelPerma");
      if (editPermaBtn && createPerma && cancelPerma) {
        editPermaBtn.hidden = false;
        createPerma.hidden = true;
        cancelPerma.hidden = true;
      }
    }
  };

  const handleCancelPermalink = () => {
    const editPermalinkInput = document.getElementById(
      "editPermalink"
    ) as HTMLInputElement;
    if (editPermalinkInput) {
      editPermalinkInput.hidden = true;
      const editPermaBtn = document.getElementById("editPermaBtn");
      const createPerma = document.getElementById("createPerma");
      const cancelPerma = document.getElementById("cancelPerma");
      if (editPermaBtn && createPerma && cancelPerma) {
        editPermaBtn.hidden = false;
        createPerma.hidden = true;
        cancelPerma.hidden = true;
      }
    }
  };

  return (
    <div className="panel mb-4">
      <div className="panel-body product-title-input">
        <label className="form-label">Write Title</label>
        <input
          type="text"
          className="form-control"
          id="productTitle"
          placeholder="Title for product"
          value={title}
          onChange={handleTitleChange}
        />
        <p className="perma-txt">
          Permalink:{" "}
          <span
            data-link={permalink}
            className="site-link text-primary"
            id="productPermalink"
          >
            {permalink}
          </span>
          <input
            type="text"
            className="form-control"
            hidden
            id="editPermalink"
          />
          <button
            className="btn-flush bg-primary"
            id="editPermaBtn"
            onClick={handleEditPermalink}
          >
            Edit
          </button>
          <button
            className="btn-flush bg-success"
            id="createPerma"
            hidden
            onClick={handleUpdatePermalink}
          >
            OK
          </button>
          <button
            className="btn-flush bg-danger"
            id="cancelPerma"
            hidden
            onClick={handleCancelPermalink}
          >
            Cancel
          </button>
        </p>
      </div>
    </div>
  );
};
export default ProductTitleForm;

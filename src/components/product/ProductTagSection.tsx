import React, { useEffect, useState } from "react";

const ProductTagSection = () => {
  const [productTagBtn, setProductTagBtn] = useState<boolean>(false);

  const handleProductTagBtn = () => {
    setProductTagBtn((prevProductTagBtn) => !prevProductTagBtn);
  };

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setTagInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  const [hasTags, setHasTags] = useState(tags.length > 0);

  useEffect(() => {
    setHasTags(tags.length > 0);
  }, [tags]);
  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Products Tags</h5>
        <div className="btn-box d-flex gap-2">
          <button className="btn btn-sm btn-icon btn-outline-primary">
            <i className="fa-light fa-arrows-rotate"></i>
          </button>
          <button
            className="btn btn-sm btn-icon btn-primary panel-close"
            onClick={handleProductTagBtn}
          >
            <i className="fa-light fa-angle-up"></i>
          </button>
        </div>
      </div>
      <div className={`panel-body ${productTagBtn ? "d-none" : ""}`}>
        <div className="product-tag-area">
          <div className="row g-3">
            <div className="col-xl-8 col-lg-7 col-9">
              <input
                type="text"
                id="productTags"
                className="form-control"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-xl-4 col-lg-5 col-3">
              <button
                className="btn btn-primary w-100"
                id="addTags"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
          </div>
          <span className="input-txt">Input tags for product</span>
          <div className={`all-tags ${hasTags ? "active" : ""}`} id="allTags">
            {tags.map((tag, index) => (
              <div className="item" key={index}>
                {tag}
                <span
                  className="close-tag"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <i className="fa-regular fa-xmark"></i>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTagSection;

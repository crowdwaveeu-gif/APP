const VideoPane = () => {
  return (
    <form>
      <div className="row align-items-center g-3 mb-3">
        <label className="col-md-2 col-form-label col-form-label-sm">
          Video Provider
        </label>
        <div className="col-md-10">
          <select className="form-control">
            <option value="">Select Provider</option>
            <option value="0">Youtube</option>
            <option value="1">Vimeo</option>
          </select>
        </div>
      </div>
      <div className="row g-3">
        <label className="col-md-2 col-form-label col-form-label-sm">
          Video Link
        </label>
        <div className="col-md-10">
          <input
            type="url"
            className="form-control"
            name="video_link"
            placeholder="Video Link"
          />
          <span className="input-additional-txt">
            Use proper link without extra parameter. Don't use short share
            link/embeded iframe code.
          </span>
        </div>
      </div>
    </form>
  );
};

export default VideoPane;

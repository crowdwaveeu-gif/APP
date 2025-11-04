const SingleInputSizing = () => {
  return (
    <div className="panel mb-4">
      <div className="panel-header">
        <h5>Input Sizing</h5>
      </div>
      <div className="panel-body">
        <p className="fs-14 pb-1 mb-10">
          Set heights using classes like
          <code>.form-control-lg</code> and
          <code>..</code>
        </p>
        <input className="form-control  mb-10" type="text" placeholder="." />
        <input
          className="form-control mb-10"
          type="text"
          placeholder="Default input"
        />
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder=".form-control-lg"
        />
      </div>
    </div>
  );
};
export default SingleInputSizing;

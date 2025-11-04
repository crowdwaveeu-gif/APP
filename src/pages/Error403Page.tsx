import ErrorMain from "../components/error/ErrorMain";

const Error403Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-403.png"
          alt="403"
          subTitle="Access Forbidden"
        />
      </div>
    </div>
  );
};
export default Error403Page;

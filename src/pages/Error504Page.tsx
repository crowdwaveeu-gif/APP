import ErrorMain from "../components/error/ErrorMain";

const Error504Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-504.png"
          alt="504"
          subTitle="Gateway Timeout"
        />
      </div>
    </div>
  );
};
export default Error504Page;

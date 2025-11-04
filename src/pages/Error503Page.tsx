import ErrorMain from "../components/error/ErrorMain";

const Error503Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-503.png"
          alt="503"
          subTitle="Service Unavailable"
        />
      </div>
    </div>
  );
};
export default Error503Page;

import ErrorMain from "../components/error/ErrorMain";

const Error400Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-400.png"
          alt="400"
          subTitle="Bad Request"
        />
      </div>
    </div>
  );
};
export default Error400Page;

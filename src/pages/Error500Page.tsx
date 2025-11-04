import ErrorMain from "../components/error/ErrorMain";

const Error500Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-500.png"
          alt="500"
          subTitle="Internal Server Error"
        />
      </div>
    </div>
  );
};
export default Error500Page;

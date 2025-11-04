import ErrorMain from "../components/error/ErrorMain";

const Error408Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-408.png"
          alt="408"
          subTitle="Request Time-Out"
        />
      </div>
    </div>
  );
};
export default Error408Page;

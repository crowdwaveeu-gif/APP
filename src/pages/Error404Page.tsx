import ErrorMain from "../components/error/ErrorMain";

const Error404Page = () => {
  return (
    <div className="main-content p-0">
      <div className="panel error-panel">
        <ErrorMain
          img="/img/bg-img/error-404.png"
          alt="404"
          subTitle="Page Not Found"
        />
      </div>
    </div>
  );
};
export default Error404Page;

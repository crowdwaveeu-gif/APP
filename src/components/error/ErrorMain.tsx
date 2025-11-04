import { Link } from "react-router-dom";

type Props = {
  img: string;
  subTitle: string;
  alt: string;
};
const ErrorMain = ({ img, subTitle, alt }: Props) => {
  return (
    <div className="panel-body">
      <div className="part-img">
        <img src={img} alt={alt} />
      </div>
      <div className="part-txt text-center">
        <h2 className="error-subtitle">{subTitle}</h2>
        <Link to="/" className="btn btn-primary">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};
export default ErrorMain;

import { Link } from "react-router-dom";

type Props = {
  link: string;
  title: string;
};

const BreadcrumbSection = ({ link, title }: Props) => {
  return (
    <div className="dashboard-breadcrumb d-flex align-items-center">
      <h6 className="mb-0">{title}</h6>

      <div className="btn-box">
        <Link to={link} className="btn btn-sm btn-primary">
          View All
        </Link>
      </div>
    </div>
  );
};
export default BreadcrumbSection;

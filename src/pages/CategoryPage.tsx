import AddNewCategoryForm from "../components/forms/AddNewCategoryForm";
import AllCategoryTable from "../components/table/AllCategoryTable";

const CategoryPage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Categories</h6>
        </div>
      </div>

      <div className="col-xxl-4 col-xl-5">
        <AddNewCategoryForm />
      </div>

      <div className="col-xxl-8 col-xl-7">
        <AllCategoryTable />
      </div>
    </div>
  );
};
export default CategoryPage;

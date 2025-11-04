import BulkActions from "../utils/dropdowns/BulkActions";
import EmployeeLength from "../utils/dropdowns/EmployeeLength";

const TableFilter = () => {
  return (
    <div className="table-filter-option">
      <div className="row g-3">
        <div className="col-12 col-sm-8">
          <form className="row g-2">
            <div className="col-9 col-sm-8 col-lg-5 col-xl-4 col-xxl-3">
              <BulkActions />
            </div>
            <div className="col-3 col-sm-4 col-lg-3 col-xl-2">
              <button className="btn btn-primary w-100">Apply</button>
            </div>
          </form>
        </div>
        <div className="col-12 col-sm-4 d-flex justify-content-end">
          <div id="employeeTableLength">
            <label className="d-flex align-items-center gap-2">
              <EmployeeLength />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableFilter;

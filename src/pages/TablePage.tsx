import BorderedTable from "../components/table/BorderedTable";
import BorderlessTable from "../components/table/BorderlessTable";
import ColoredBorderTable from "../components/table/ColoredBorderTable";
import ColoredTable from "../components/table/ColoredTable";
import CustomizedTable from "../components/table/CustomizedTable";
import DefaultDataTable from "../components/table/DefaultDataTable";
import DefaultTable from "../components/table/DefaultTable";
import HoverableTable from "../components/table/HoverableTable";
import ScrollDataTable from "../components/table/ScrollDataTable";
import StrippedColumnTable from "../components/table/StrippedColumnTable";
import StrippedRowTable from "../components/table/StrippedRowTable";

const TablePage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Tables</h6>
        </div>
      </div>
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <h5>Basic Tables</h5>
          </div>
          <div className="panel-body">
            <div className="row g-3">
              <DefaultTable />
              <StrippedRowTable />
              <StrippedColumnTable />
              <ColoredTable />
              <HoverableTable />
              <BorderedTable />
              <ColoredBorderTable />
              <BorderlessTable />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <h5>Data Tables</h5>
          </div>
          <div className="panel-body">
            <div className="row g-3">
              <DefaultDataTable />
              <ScrollDataTable />
              <CustomizedTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TablePage;

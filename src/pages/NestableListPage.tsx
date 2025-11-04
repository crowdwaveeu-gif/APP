import NestableFolder from "../components/nestable/NestableFolder";
import NestableTeam from "../components/nestable/NestableTeam";
import NestedSortableHandle from "../components/nestable/NestedSortableHandle";
import NestedSortableList from "../components/nestable/NestedSortableList";

const NestableListPage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Nestable List</h6>
        </div>
      </div>

      <NestedSortableList />

      <NestedSortableHandle />

      <NestableFolder />

      <NestableTeam />
    </div>
  );
};
export default NestableListPage;

import AllFilesTopSection from "./AllFilesTopSection";
import FileSection from "./FileSection";

const AllFilesTabPane = () => {
  return (
    <>
      <AllFilesTopSection />
      <FileSection title="Recent Files" grid />
    </>
  );
};
export default AllFilesTabPane;

import { Outlet, useLocation } from "react-router-dom";
import RightSidebarSection from "../sidebar/RightSidebarSection";
import RightSidebarBtn from "../utils/RightSidebarBtn";
import EditTaskModal from "../modal/EditTaskModal";
import AddTaskModal from "../modal/AddTaskModal";
import ViewTaskModal from "../modal/ViewTaskModal";
import ComposeEmailModal from "../modal/ComposeEmailModal";
import ExpandMailModal from "../modal/ExpandMailModal";
import UploadFileModal from "../modal/UploadFileModal";
import CreateFolderModal from "../modal/CreateFolderModal";
import FileDetailsModal from "../modal/FileDetailsModal";

const HomePageLayout = () => {
  const location = useLocation();
  const pathName = location.pathname.slice(1) + "_page";
  return (
    <main className={pathName}>
      <RightSidebarBtn />
      <RightSidebarSection />
      <Outlet />
      {/* Modals */}
      <EditTaskModal />
      <AddTaskModal />
      <ViewTaskModal />
      <ComposeEmailModal />
      <ExpandMailModal />
      <UploadFileModal />
      <CreateFolderModal />
      <FileDetailsModal />
    </main>
  );
};
export default HomePageLayout;

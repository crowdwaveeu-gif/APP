import { useEffect, useState } from "react";
import CkEditor from "./CkEditor";

const DynamicEditor = () => {
  const [editorVisible, setEditorVisible] = useState(true);
  const [editorData, setEditorData] = useState<string>("");

  const handleEditorDataChange = (data: string) => {
    setEditorData(data);
  };

  useEffect(() => {
    return () => {
      // Clean up resources when the component is unmounted
      setEditorVisible(true); // Ensure editor is visible when component is re-mounted
      setEditorData(""); // Reset editor data
    };
  }, []);

  return (
    <>
      {editorVisible && (
        <CkEditor
          initialData={editorData}
          onDataChanged={handleEditorDataChange}
        />
      )}
    </>
  );
};

export default DynamicEditor;

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CkEditorProps {
  initialData: string;
  onDataChanged: (data: string) => void;
}

const CkEditor = ({ initialData, onDataChanged }: CkEditorProps) => {
  return (
    <div className="editor">
      <CKEditor
        editor={ClassicEditor}
        data={initialData}
        onChange={(_, editor) => {
          const data = editor.getData();
          onDataChanged(data);
        }}
      />
    </div>
  );
};

export default CkEditor;

import FileUploadForm from "../components/forms/FileUploadForm";
import FormLayout from "../components/forms/FormLayout";
import InputExampleForm from "../components/forms/InputExampleForm";
import InputSizingForm from "../components/forms/InputSizingForm";
import RichTextEditorForm from "../components/forms/RichTextEditorForm";

const FormPage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Form Elements</h6>
        </div>
      </div>

      <InputExampleForm />

      <InputSizingForm />

      <FormLayout />

      <FileUploadForm />

      <RichTextEditorForm />
    </div>
  );
};
export default FormPage;

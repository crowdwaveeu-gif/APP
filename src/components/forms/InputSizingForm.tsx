import ButtonCheckboxForm from "./ButtonCheckboxForm";
import DropdownInputForm from "./DropdownInputForm";
import InputGroupSizing from "./InputGroupSizing";
import MultipleInputForm from "./MultipleInputForm";
import SingleInputSizing from "./SingleInputSizing";

const InputSizingForm = () => {
  return (
    <div className="col-xl-6">
      <SingleInputSizing />
      <InputGroupSizing />
      <MultipleInputForm />
      <ButtonCheckboxForm />
      <DropdownInputForm />
    </div>
  );
};
export default InputSizingForm;

import AddressForm from "../components/forms/AddressForm";
import BankAccountForm from "../components/forms/BankAccountForm";
import BasicInformationForm from "../components/forms/BasicInformationForm";
import BiographicalInformationForm from "../components/forms/BiographicalInformationForm";
import EmergencyContactForm from "../components/forms/EmergencyContactForm";
import PersonalInformationForm from "../components/forms/PersonalInformationForm";
import SalaryForm from "../components/forms/SalaryForm";
import LoginInformationForm from "./LoginInformationForm";

const AddEmployeePage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <BasicInformationForm />
      </div>
      <div className="col-12">
        <PersonalInformationForm />
      </div>
      <div className="col-12">
        <SalaryForm />
      </div>
      <div className="col-12">
        <BankAccountForm />
      </div>
      <div className="col-12">
        <AddressForm />
      </div>
      <div className="col-12">
        <BiographicalInformationForm />
      </div>
      <div className="col-12">
        <EmergencyContactForm />
      </div>
      <div className="col-12">
        <LoginInformationForm />
      </div>

      <div className="col-12 d-flex justify-content-end">
        <button className="btn btn-success">Save Employee</button>
      </div>
    </div>
  );
};
export default AddEmployeePage;

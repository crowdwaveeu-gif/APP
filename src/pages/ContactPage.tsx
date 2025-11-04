import ContactForm from "../components/forms/ContactForm";
import ContactForm2 from "../components/forms/ContactForm2";
import ContactForm3 from "../components/forms/ContactForm3";
import ContactForm4 from "../components/forms/ContactForm4";

const ContactPage = () => {
  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Contact Form One</h5>
          </div>
          <ContactForm />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Contact Form Two</h5>
          </div>
          <ContactForm2 />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Contact Form Three</h5>
          </div>
          <ContactForm3 />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Contact Form Four</h5>
          </div>
          <ContactForm4 />
        </div>
      </div>
    </div>
  );
};
export default ContactPage;

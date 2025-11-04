import { useEffect, useState } from "react";
import { ActiveStepState } from "../../types";
import Select from "react-select";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  toggle: (tep: keyof ActiveStepState) => void;
  prev: (prevStep: keyof ActiveStepState, tab: string) => void;
};
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const yearOptions = Array.from({ length: 10 }, (_, k) => ({
  value: 2023 + k,
  label: (2023 + k).toString(),
}));

const AuthStep4 = ({ toggle, prev }: Props) => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [selectedYear, setSelectedYear] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [selectedDay, setSelectedDay] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [dayOptions, setDayOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    if (selectedYear) {
      // Assuming a fixed month (e.g., January)
      const days = getDaysInMonth(1, selectedYear.value);
      const newDayOptions = Array.from({ length: days }, (_, k) => ({
        value: k + 1,
        label: (k + 1).toString(),
      }));
      setDayOptions(newDayOptions);
    } else {
      setDayOptions([]);
    }
    setSelectedDay(null); // Reset the selected day when the year changes
  }, [selectedYear]);
  return (
    <div className="step-content-wrap">
      <div className="step-content">
        <div className="step-heading">
          <h4 className="step-title">Billing Details</h4>
          <span>
            For further details, visit our <a href="#">Help Page</a>.
          </span>
        </div>
        <div className="billing-details-wrap">
          <form className="row g-3 align-items-end">
            <div className="col-12">
              <label htmlFor="nameOnCard" className="form-label">
                Name On Card
              </label>
              <input type="text" id="nameOnCard" className="form-control" />
            </div>
            <div className="col-12">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <div className="input-group">
                <input type="number" id="cardNumber" className="form-control" />
                <span className="input-group-text d-flex gap-1">
                  <img src="/img/bg-img/visa.svg" alt="visa" />
                  <img src="/img/bg-img/mastercard.svg" alt="mastercard" />
                  <img
                    src="/img/bg-img/american-express.svg"
                    alt="american-express"
                  />
                </span>
              </div>
            </div>
            <div className="col-sm-4 col-6">
              <label className="form-label">Expiration Date</label>
              <Select
                options={dayOptions}
                value={selectedDay}
                onChange={(option) => setSelectedDay(option)}
                placeholder="Select Day"
                isDisabled={!selectedYear}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: darkMode ? "#141718" : "#fff",
                    color: darkMode ? "#919191" : "#222222",
                  }),
                }}
              />
            </div>
            <div className="col-sm-4 col-7">
              <Select
                options={yearOptions}
                value={selectedYear}
                onChange={(option) => setSelectedYear(option)}
                placeholder="Select Year"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: darkMode ? "#141718" : "#fff",
                    color: darkMode ? "#919191" : "#222222",
                  }),
                }}
              />
            </div>
            <div className="col-sm-4 col-5">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <div className="input-group">
                <input type="number" id="cvv" className="form-control" />
                <span className="input-group-text fs-5">
                  <i className="fa-duotone fa-credit-card"></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="saveCardForFurtherBilling"
                />
                <label
                  className="form-check-label"
                  htmlFor="saveCardForFurtherBilling"
                >
                  Save Card for further billing?
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="btn-box mb-5 d-flex flex-wrap gap-2 justify-content-between">
        <button
          className="btn btn-secondary prev-button px-sm-3"
          onClick={() => prev("step4", "step3")}
        >
          <i className="fa-light fa-arrow-left"></i>
          Previous
        </button>
        <button
          className="btn btn-primary next-button px-sm-3"
          onClick={() => toggle("step5")}
        >
          Complete Submission <i className="fa-light fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
export default AuthStep4;

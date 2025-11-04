import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const employeeLengthOptions: Option[] = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const EmployeeLength = () => {
  const [employeeLength, setEmployeeLength] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <label htmlFor="length" id="employee_length">
      Show
      <Select
        options={employeeLengthOptions}
        value={employeeLength}
        onChange={(selectedOption) =>
          setEmployeeLength(selectedOption as Option)
        }
        placeholder="10"
        className="ar-select"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            color: darkMode ? "#c4c4c4" : "#222222",
            fontSize: 14,
            borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#dbeaea",
          }),
        }}
      />
    </label>
  );
};
export default EmployeeLength;

import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const employeeOptions: Option[] = [
  { value: "", label: "Select Employee" },
  { value: "LewisStone", label: "Lewis Stone" },
  { value: "JackHolland", label: "Jack Holland" },
  { value: "LilyBurgess", label: "Lily Burgess" },
  { value: "HarrisonFrench", label: "Harrison French" },
  { value: "IsabelMellor", label: "Isabel Mellor" },
  { value: "AdamBates", label: "Adam Bates" },
  { value: "MillieLee", label: "Millie Lee" },
  { value: "MadeleineHart", label: "Madeleine Hart" },
  { value: "LouiseGoddard", label: "Louise Goddard" },
  { value: "JosephFrancis", label: "Joseph Francis" },
  { value: "KaiBarker", label: "Kai Barker" },
  { value: "ErinKnight", label: "Erin Knight" },
  { value: "JaydenTaylor", label: "Jayden Taylor" },
  { value: "SophieHilton", label: "Sophie Hilton" },
  { value: "LeahWright", label: "Leah Wright" },
  { value: "LewisHooper", label: "Lewis Hooper" },
];
const EmployeeOptions = () => {
  const [employeeList, setEmployeeList] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={employeeOptions}
      value={employeeList}
      className="ar-select"
      onChange={(selectedOption) => setEmployeeList(selectedOption as Option)}
      placeholder="Select Employee"
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
  );
};
export default EmployeeOptions;

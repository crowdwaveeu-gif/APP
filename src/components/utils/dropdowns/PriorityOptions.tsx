import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const priorityOptions: Option[] = [
  { value: "", label: "Select Priority" },
  { value: "0", label: "Low" },
  { value: "1", label: "Medium" },
  { value: "2", label: "High" },
  { value: "3", label: "Urgent" },
];
const PriorityOptions = () => {
  const [priority, setPriority] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={priorityOptions}
      value={priority}
      className="ar-select"
      onChange={(selectedOption) => setPriority(selectedOption as Option)}
      placeholder="Select Priority"
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
export default PriorityOptions;

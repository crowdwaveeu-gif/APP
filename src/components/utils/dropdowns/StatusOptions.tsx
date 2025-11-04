import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const statusOptions: Option[] = [
  { value: "", label: "Select Status" },
  { value: "0", label: "Not Started" },
  { value: "1", label: "Pending" },
  { value: "2", label: "On Hold" },
  { value: "3", label: "In Progress" },
  { value: "4", label: "Completed" },
];

const StatusOptions = () => {
  const [status, setStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={statusOptions}
      value={status}
      className="ar-select"
      onChange={(selectedOption) => setStatus(selectedOption as Option)}
      placeholder="Select Status"
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
export default StatusOptions;

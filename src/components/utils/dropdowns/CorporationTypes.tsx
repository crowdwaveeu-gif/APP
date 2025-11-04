import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const corporationTypeOptions: Option[] = [
  { value: "0", label: "S Corporation" },
  { value: "1", label: "C Corporation" },
  { value: "2", label: "Sole Proprietorship" },
  { value: "3", label: "Non-profit" },
  { value: "5", label: "Limited Liability" },
];
const CorporationTypes = () => {
  const [corporationType, setCorporationType] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <Select
      options={corporationTypeOptions}
      value={corporationType}
      onChange={(selectedOption) =>
        setCorporationType(selectedOption as Option)
      }
      placeholder="S Corporation"
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
  );
};
export default CorporationTypes;

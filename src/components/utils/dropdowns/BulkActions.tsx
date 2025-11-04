import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const bulkActionOptions: Option[] = [
  { value: "0", label: "Bulk action" },
  { value: "1", label: "Move to trash" },
];
const BulkActions = () => {
  const [bulkAction, setBulkAction] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={bulkActionOptions}
      className="ar-select"
      value={bulkAction}
      onChange={(selectedOption) => setBulkAction(selectedOption as Option)}
      placeholder="Bulk action"
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
export default BulkActions;

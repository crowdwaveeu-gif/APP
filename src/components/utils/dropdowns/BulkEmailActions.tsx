import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const bulkActionOptions: Option[] = [
  { value: "0", label: "Bulk action" },
  { value: "1", label: "Move to archive" },
  { value: "2", label: "Report to spam" },
  { value: "3", label: "Mark as read" },
  { value: "4", label: "Move to trash" },
];

const BulkEmailActions = () => {
  const [bulkAction, setBulkAction] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={bulkActionOptions}
      value={bulkAction}
      className="ar-select"
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
export default BulkEmailActions;

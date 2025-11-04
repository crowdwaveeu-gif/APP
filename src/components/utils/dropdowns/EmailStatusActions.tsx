import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const EmailStatusActionOptions: Option[] = [
  { value: "0", label: "All" },
  { value: "1", label: "None" },
  { value: "2", label: "Read" },
  { value: "3", label: "Unread" },
  { value: "4", label: "Starred" },
  { value: "5", label: "Unstarred" },
];

const EmailStatusActions = () => {
  const [EmailStatusAction, setEmailStatusAction] = useState<Option | null>(
    null
  );
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={EmailStatusActionOptions}
      value={EmailStatusAction}
      onChange={(selectedOption) =>
        setEmailStatusAction(selectedOption as Option)
      }
      placeholder="All"
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
export default EmailStatusActions;

import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const orderStatusOptions: Option[] = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Delivered" },
  { value: "2", label: "Canceled" },
];

const OrderStatus = () => {
  const [bulkAction, setBulkAction] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={orderStatusOptions}
      value={bulkAction}
      onChange={(selectedOption) => setBulkAction(selectedOption as Option)}
      placeholder="Pending"
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
export default OrderStatus;

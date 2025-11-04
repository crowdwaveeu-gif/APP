import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const categoryOptions: Option[] = [
  { value: "0", label: "All Category" },
  { value: "1", label: "Cloth" },
  { value: "2", label: "Fashion" },
  { value: "3", label: "Bag" },
  { value: "4", label: "Food" },
  { value: "5", label: "Medicine" },
  { value: "6", label: "Watch" },
  { value: "7", label: "Smart Phone" },
];

const CategoryList = () => {
  const [category, setCategory] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={categoryOptions}
      value={category}
      className="ar-select"
      placeholder="All Category"
      onChange={(selectedOption) => setCategory(selectedOption as Option)}
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
export default CategoryList;

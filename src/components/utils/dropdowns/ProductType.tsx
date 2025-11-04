import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const productTypeOptions: Option[] = [
  { value: "0", label: "All Product Type" },
  { value: "1", label: "Downloadable" },
  { value: "2", label: "Virtual" },
];

const ProductType = () => {
  const [productType, setProductType] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={productTypeOptions}
      value={productType}
      className="ar-select"
      onChange={(selectedOption) => setProductType(selectedOption as Option)}
      placeholder="All Product Type"
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
export default ProductType;

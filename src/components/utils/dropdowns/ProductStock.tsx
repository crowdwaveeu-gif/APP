import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

const productStockOptions: Option[] = [
  { value: "0", label: "All Product Stock" },
  { value: "1", label: "In stock" },
  { value: "2", label: "Out of stock" },
  { value: "3", label: "On backorder" },
];

const ProductStock = () => {
  const [productStock, setProductStock] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <Select
      options={productStockOptions}
      value={productStock}
      className="ar-select"
      placeholder="All Product Stock"
      onChange={(selectedOption) => setProductStock(selectedOption as Option)}
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
export default ProductStock;

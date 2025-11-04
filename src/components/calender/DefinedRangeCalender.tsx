import { useState, useRef, useEffect } from "react";
import { DefinedRange } from "react-date-range";

const DefinedRangeCalender = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    if (inputRef.current) {
      const startDate = ranges.selection.startDate.toISOString().split("T")[0];
      const endDate = ranges.selection.endDate.toISOString().split("T")[0];
      inputRef.current.value = `${startDate} - ${endDate}`;
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="col" role="button">
      <input
        type="text"
        className="w-100 form-control  table-date-range-filter"
        placeholder="11/15/2022 - 11/23/2022"
        onFocus={toggleDatePicker}
        ref={inputRef}
      />
      {showDatePicker && (
        <div
          className="date-picker-container defined-date-range"
          ref={datePickerRef}
        >
          <DefinedRange
            className="date-range-picker"
            ranges={dateRange}
            onChange={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DefinedRangeCalender;

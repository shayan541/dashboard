import React from "react";
import type { FieldValues, UseFormSetValue } from "react-hook-form";

import OptionBox from "./OptionBox";
import type { option } from "../../types";

type AnySetValue<T extends FieldValues = FieldValues> = UseFormSetValue<T>;

const DropDown: React.FC<{
  setValue?: AnySetValue;
  value?: string;
  name?: string;
  options: option[];
  onChange?: (i: string) => void;
  label: string;
  placeHolder?: string;
}> = ({ options, onChange, label, name, setValue, value, placeHolder }) => {
  const onChangeHandler = (input: string) => {
    if (onChange) onChange(input);
    if (name && setValue) setValue(name, input, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <OptionBox options={options} onChange={(val) => onChangeHandler(val)} id="priority">
      <div className="flex flex-col">
        <label onClick={(e) => e.stopPropagation()}>{label}:</label>
        <div className="border shadow border-gold-100 dark:border-black outline-none rounded min-h-[25.35px] mt-1 px-1 flex justify-between">
          {options.find((item) => item.key === value)?.value ? (
            <p className="capitalize">{options.find((item) => item.key === value)?.value}</p>
          ) : (
            <p className="text-[#b5babe]">{placeHolder}</p>
          )}

          <span className={`ml-2 dark:text-darkText`}>▾</span>
        </div>
      </div>
    </OptionBox>
  );
};

export default DropDown;

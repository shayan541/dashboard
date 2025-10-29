import React, { useState } from "react";
import type { FieldValues, UseFormSetValue } from "react-hook-form";

type AnySetValue<T extends FieldValues = FieldValues> = UseFormSetValue<T>;

const CheckBox: React.FC<{ label: string; name: string; onChange?: (val: boolean) => void; setValue?: AnySetValue; value?: boolean }> = ({
  label,
  name,
  setValue,
  onChange,
  value,
}) => {
  const [isChecked, setIsChecked] = useState(value);
  return (
    <div>
      <label>{label}:</label>
      <div
        onClick={() => {
          setIsChecked((checked) => {
            if (onChange) onChange(!checked);
            if (name && setValue) setValue(name, !checked, { shouldValidate: true, shouldDirty: true });
            return !checked;
          });
        }}
        className="w-4 h-4 border shadow border-gold-100 outline-none rounded cursor-pointer dark:border-black"
      >
        {isChecked && (
          <svg className="w-4 h-4 text-gold-200 dark:text-darkbtn" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CheckBox;

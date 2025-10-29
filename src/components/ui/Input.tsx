import React from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

const Input: React.FC<{
  register?: ReturnType<UseFormRegister<FieldValues>>;
  placeHolder?: string;
  label: string;
  error?: string | undefined;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ register, label, error, value, onChange, placeHolder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`input+${label}`}>{label}:</label>
      <input
        placeholder={placeHolder}
        className="border shadow border-gold-100 dark:border-black outline-none rounded mt-1 px-1 dark:bg-transparent"
        {...register}
        id={`input+${label}`}
        defaultValue={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;

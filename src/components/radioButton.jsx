import React from "react";
import { useFormContext } from "react-hook-form";

const RadioButton = ({ name, value, label, register, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={value}
        value={value}
        className="hidden"
        {...register(name)}
      />
      <label
        htmlFor={value}
        className="cursor-pointer px-20 rounded-xl transition duration-300 py-1"
      >
        {label}
      </label>
    </div>
  );
};

const CustomRadioGroup = ({ className, onChange, options, register }) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={option.name}
          value={option.value}
          label={option.label}
          register={register}
        />
      ))}
    </div>
  );
};

export default CustomRadioGroup;

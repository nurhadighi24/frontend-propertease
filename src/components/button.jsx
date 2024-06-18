import React from "react";
import { Loading } from "./loading";

export default function Button(props) {
  const { label, onClick, type, className, disabled, isLoading, icon } = props;
  return (
    <button onClick={onClick} type={type} {...props} disabled={disabled}>
      <div className=" flex items-center justify-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    </button>
  );
}

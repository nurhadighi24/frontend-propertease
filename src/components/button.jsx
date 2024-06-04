import React from "react";

export default function Button(props) {
  const { label, onClick, type, className, icon } = props;
  return (
    <button onClick={onClick} type={type} {...props}>
      <div className="flex items-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    </button>
  );
}

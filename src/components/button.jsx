import React from "react";

export default function Button(props) {
  const { label, onClick, type, className } = props;
  return (
    <button onClick={onClick} type={type} {...props}>
      {label}
    </button>
  );
}

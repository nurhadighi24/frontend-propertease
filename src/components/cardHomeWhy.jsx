import React from "react";

export default function CardHomeWhy(props) {
  const { titlesLabel, descLabel } = props;
  return (
    <div className="border w-80 p-5 rounded-3xl shadow-2xl mx-5 max-sm:mb-3">
      <p className="text-2xl">{titlesLabel}</p>
      <p className="">{descLabel}</p>
    </div>
  );
}

import React from "react";

export default function CardHomeWhy(props) {
  const { titlesLabel, descLabel } = props;
  return (
    <div className="border w-max p-5 rounded-3xl shadow-2xl mx-5">
      <p className="text-2xl">{titlesLabel}</p>
      <p className="">{descLabel}</p>
    </div>
  );
}

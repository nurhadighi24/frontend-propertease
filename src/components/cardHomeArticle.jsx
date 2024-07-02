import React from "react";

export default function CardHomeArticle(props) {
  const { titlesArticle, descArticle, src, alt } = props;
  return (
    <div className="w-96 rounded-xl shadow-xl p-2 m-5">
      <img src={src} alt={alt} className=" w-96 rounded-t-xl" />
      <p className=" text-base">{titlesArticle}</p>
      <p className="text-slate-500 text-justify">{descArticle}</p>
    </div>
  );
}

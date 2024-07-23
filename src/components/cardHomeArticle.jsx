import React from "react";
import { Link } from "react-router-dom";

export default function CardHomeArticle(props) {
  const { titlesArticle, descArticle, src, alt, onClick } = props;
  return (
    <div className="w-[30rem] rounded-xl shadow-xl p-2 m-5">
      <img src={src} alt={alt} className=" w-[30rem] h-[20rem] rounded-t-xl" />
      <p className=" text-base">{titlesArticle}</p>
      <p className="text-slate-500 text-justify">{descArticle}</p>
      <Link
        onClick={onClick}
        className="border border-blue-secondary text-blue-secondary rounded-xl px-10 py-1"
      >
        Baca Selengkapnya
      </Link>
    </div>
  );
}

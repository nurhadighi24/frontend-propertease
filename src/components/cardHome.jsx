import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Button from "./button";
import { Link } from "react-router-dom";

export default function CardHome(props) {
  const {
    src,
    titles,
    location,
    landArea,
    buildingArea,
    bedroom,
    price,
    alt,
    onClick,
  } = props;
  return (
    <div className="bg-white  w-max rounded-xl shadow-xl m-5">
      <img src={src} alt={alt} className=" w-[30rem] h-[20rem] rounded-t-xl" />
      <div className="pl-3">
        <p className="font-bold text-3xl">{titles}</p>
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-blue-secondary text-2xl" />
          <p className=" font-bold">{location}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Luas Bangunan</p>
          <p className=" font-bold">{buildingArea}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Luas Tanah</p>
          <p className=" font-bold">{landArea}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Kamar Tidur</p>
          <p className=" font-bold">{bedroom}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Harga</p>
          <p className=" font-bold">{price}</p>
        </div>
        <div className="flex justify-center py-5">
          <Link
            onClick={onClick}
            className="border border-blue-secondary text-blue-secondary rounded-xl px-10 py-1"
          >
            Info Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
}

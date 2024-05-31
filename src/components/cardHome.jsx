import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Button from "./button";

export default function CardHome(props) {
  const { src, titles, location, unitWide, bedroom, price, alt } = props;
  return (
    <div className="bg-white  w-max rounded-xl shadow-xl">
      <img src={src} alt={alt} className=" w-96 rounded-t-xl" />
      <div className="pl-3">
        <p className="font-bold text-3xl">{titles}</p>
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-blue-secondary text-2xl" />
          <p className=" font-bold">{location}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Luas Unit</p>
          <p className=" font-bold">{unitWide}</p>
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
          <Button
            label="Info Selengkapnya"
            className="border border-blue-secondary text-blue-secondary rounded-xl px-10 py-1"
          />
        </div>
      </div>
    </div>
  );
}

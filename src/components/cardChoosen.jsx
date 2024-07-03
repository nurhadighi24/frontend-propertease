import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { IoLogoWhatsapp } from "react-icons/io";

export default function CardChoosen(props) {
  const {
    src,
    alt,
    titlesChoosen,
    locationChoosen,
    descChoosen,
    priceChoosen,
    onClick,
  } = props;

  return (
    <div className="flex justify-center items-center mx-5 gap-3 my-10 border rounded-xl shadow-2xl">
      <div className=" w-2/6">
        <img src={src} alt={alt} className=" rounded-xl" />
      </div>
      <div>
        <p className="text-blue-secondary font-bold text-4xl">
          {titlesChoosen}
        </p>
        <div className="flex items-center gap-1 my-3">
          <FaLocationDot className="text-blue-secondary" />
          <p className=" font-bold">{locationChoosen}</p>
        </div>
        <p>{descChoosen}</p>
        <p className="font-bold text-4xl my-3">{priceChoosen}</p>
        <div className=" flex items-center justify-center gap-5">
          <Link
            onClick={onClick}
            className="border border-blue-secondary rounded-xl text-blue-secondary px-3 py-2 text-xl"
          >
            Selengkapnya
          </Link>
          <Link className="flex items-center bg-green-primary px-3 py-2 rounded-xl text-xl">
            <IoLogoWhatsapp className="text-white" />
            <p className="text-white">Whatsapp</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

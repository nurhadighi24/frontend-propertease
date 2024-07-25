import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { IoLogoWhatsapp } from "react-icons/io";
import ReactWhatsapp from "react-whatsapp";
import { AiOutlineInfo } from "react-icons/ai";

export default function CardChoosen(props) {
  const {
    src,
    alt,
    titlesChoosen,
    addressChoosen,
    provinceChoosen,
    cityChoosen,
    districtChoosen,
    descChoosen,
    priceChoosen,
    onClick,
    phone,
    name,
    propertyType,
  } = props;

  const phoneWithCountryCode = `+62${phone}`;

  return (
    <div className="flex justify-center items-center mx-5 gap-3 my-10 border rounded-xl shadow-2xl">
      <img src={src} alt={alt} className=" w-[30rem] h-[20rem] rounded-xl" />

      <div>
        <div className="flex justify-between items-center">
          <p className="text-blue-secondary font-bold text-4xl">
            {titlesChoosen}
          </p>
          <div className="flex items-center mx-3">
            <AiOutlineInfo className="text-blue-secondary" />
            <p>{propertyType}</p>
          </div>
        </div>
        <div className=" mt-3">
          <div className=" flex gap-1 items-center">
            <FaLocationDot className="text-blue-secondary" />
            <p className=" font-bold">
              Provinsi {provinceChoosen}, Kota/Kabupaten {cityChoosen},
              Kelurahan {districtChoosen}
            </p>
          </div>
          <p className="font-bold mb-3">{addressChoosen}</p>
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

          <ReactWhatsapp
            number={phoneWithCountryCode}
            message={`Halo, ${name} saya tertarik dengan properti ${titlesChoosen}`}
          >
            <div className="flex items-center bg-green-primary px-3 py-2 rounded-xl text-xl">
              <IoLogoWhatsapp className="text-white" />
              <p className="text-white">Whatsapp</p>
            </div>
          </ReactWhatsapp>
        </div>
      </div>
    </div>
  );
}

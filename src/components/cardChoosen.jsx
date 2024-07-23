import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { IoLogoWhatsapp } from "react-icons/io";
import ReactWhatsapp from "react-whatsapp";

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
  } = props;

  const phoneWithCountryCode = `+62${phone}`;

  return (
    <div className="flex justify-center items-center mx-5 gap-3 my-10 border rounded-xl shadow-2xl">
      <div className=" w-2/6">
        <img src={src} alt={alt} className=" w-[30rem] h-[20rem] rounded-xl" />
      </div>
      <div>
        <p className="text-blue-secondary font-bold text-4xl">
          {titlesChoosen}
        </p>
        <div className="flex items-center gap-1 mt-3">
          <FaLocationDot className="text-blue-secondary" />
          <div className=" items-center">
            <p className=" font-bold">
              Provinsi {provinceChoosen}, Kota/Kabupaten {cityChoosen},
              Kelurahan {districtChoosen}
            </p>
            <p className="font-bold mb-3">{addressChoosen}</p>
          </div>
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

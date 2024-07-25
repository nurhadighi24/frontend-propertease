import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex items-center justify-around w-full bg-blue-primary bottom-0 py-5">
      <div className=" flex flex-col">
        <p className=" text-black font-bold text-2xl py-3">TENTANG</p>
        <Link className=" text-white" to="/tentang-kami">
          Tentang Kami
        </Link>
        <Link className=" text-white">Hubungi Kami</Link>
      </div>
      <div className="flex items-center">
        <Link className="text-white font-bold text-3xl" to="/">
          PropertEase
        </Link>
        <div>
          <p>
            ©<span className="text-white">2024</span>
          </p>
        </div>
      </div>
    </div>
  );
}

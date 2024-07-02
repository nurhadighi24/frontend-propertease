import Navbar from "@/components/navbar";

import { FaLocationDot } from "react-icons/fa6";

import { BsFillPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@/components/button";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { getPropertyIklanSaya } from "@/utils/apis/property/propertyIklanSaya";

export default function IklanSaya() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mx-5 gap-3 my-10 border rounded-xl shadow-2xl">
        <div className=" w-2/6">
          <img
            src="src/assets/example-photo.jpeg"
            alt="Iklan Saya gambar"
            className=" rounded-xl"
          />
        </div>
        <div>
          <p className="text-blue-secondary font-bold text-4xl">
            Riverside Residence
          </p>
          <div className="flex items-center gap-1 my-3">
            <FaLocationDot className="text-blue-secondary" />
            <p className=" font-bold">Tangerang, Alam Sutera, Banten</p>
          </div>
          <p>
            Hunian nyaman dan aman, bebas banjir, strategis, harga all in.
            Riverside Residence dengan 2 lantai, 2-3 kamar tidur serta
            dilengkapi dengan 1-2 kamar mandi.
          </p>
          <p className="font-bold text-4xl my-3">Rp365.900.000</p>
          <div className=" flex items-center justify-center gap-5">
            <Link
              to="/pasang-iklan"
              className="border border-blue-secondary rounded-xl text-white px-5 py-2 text-xl flex items-center gap-5 bg-green-edit"
            >
              <BsFillPencilFill />
              <p>Edit</p>
            </Link>
            <Button
              className="flex items-center bg-red-delete px-3 py-2 rounded-xl text-xl text-white"
              label="Hapus"
              icon={<FaTrashAlt />}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

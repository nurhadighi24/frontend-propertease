import React from "react";
import Navbar from "@/components/navbar";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";

export default function DetailProperty() {
  return (
    <>
      <Navbar />
      <div className="mx-5">
        <div className="flex items-center">
          <div className="w-3/5">
            <div>
              <img
                src="src/assets/example-photo.jpeg"
                alt="Gambar Detail Properti"
                className=" rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className=" text-3xl font-bold">Riverside Residence</p>
              <p className=" text-2xl font-bold">Rp.365.000.000</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <FaLocationDot className="text-blue-secondary" />
              <p className="font-bold">Tangerang, Alam Sutera, Banten</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <p>Kamar Tidur</p>
              <p className="font-bold">3</p>
            </div>
            <div className="border rounded-lg bg-gray-primary p-3">
              <p className="font-bold">DESKRIPSI SELENGKAPNYA</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Architecto consequuntur expedita nulla consectetur laboriosam
                deserunt quia asperiores nam, maiores iste cumque, obcaecati ab
                fugiat neque dolores non harum velit quis.
              </p>
            </div>
          </div>
          <div className="flex justify-center w-2/5">
            <div className="shadow-xl p-6 rounded-lg border">
              <p className="text-center pb-5 font-bold text-5xl">ANAIS</p>
              <Link className="flex items-center bg-green-primary px-3 py-2 rounded-xl text-xl">
                <IoLogoWhatsapp className="text-white" />
                <p className="text-white">Whatsapp</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

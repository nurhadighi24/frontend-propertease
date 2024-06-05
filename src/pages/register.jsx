import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import Button from "@/components/button";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowIcon(!showIcon);
  };
  return (
    <>
      <Navbar />
      <div className="bg-white rounded-2xl shadow-2xl mx-5 my-20 flex flex-col items-center ">
        <div>
          <p className="text-center text-3xl font-bold pt-5">Daftar</p>
          <p>Daftarkan diri anda sekarang!</p>
        </div>
        <form className="w-2/6">
          <Input placeholder="Nama" className="my-5" type="text" />
          <Input placeholder="Email" className="my-5" type="email" />
          <Input placeholder="No.Hp" className="my-5" type="tel" />
          <div className="relative">
            <Input
              placeholder="Password"
              className="my-5"
              type={showPassword ? "text" : "password"}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showIcon ? (
                <FaRegEyeSlash onClick={handleShowPassword} />
              ) : (
                <FaRegEye onClick={handleShowPassword} />
              )}
            </div>
          </div>
          <Input
            placeholder="Konfirmasi Password"
            className="my-5"
            type={showPassword ? "text" : "password"}
          />
          <div className="w-full flex justify-center my-5">
            <Button
              label="Masuk"
              className="text-white bg-blue-secondary w-80 py-2 text-center rounded-lg"
            />
          </div>
          <p className="w-full flex justify-center">
            Sudah punya akun?{" "}
            <Link className="font-bold" to="/login" type="submit">
              Masuk
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

import React, { useState } from "react";
import Button from "@/components/button";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

export default function Login() {
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
          <p className="text-center text-3xl font-bold py-5">
            Sudah pernah bergabung sebelumnya? Yuk Masuk
          </p>
        </div>
        <form className="w-2/6">
          <Input placeholder="Email" className="my-5" type="email" />
          <div className=" relative">
            <Input
              placeholder="Password"
              className=""
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
          <div className="w-full flex justify-end">
            <Button label="Lupa Password?" className=" text-end" />
          </div>
          <div className="w-full flex justify-center my-5">
            <Button
              label="Masuk"
              className="text-white bg-blue-secondary w-80 py-2 text-center rounded-lg"
              type="submit"
            />
          </div>
        </form>

        <p className="my-5">
          Belum punya akun?{" "}
          <Link className="font-bold" to="/register">
            Daftar
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}

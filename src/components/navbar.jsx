import React, { useState } from "react";
import Button from "./button";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "@/utils/context/tokenContext";
import { FaTimes, FaBars } from "react-icons/fa";

export default function Navbar(props) {
  const { label } = props;
  const navigate = useNavigate();
  const { tokenLocal } = useToken();
  const [isOpen, setIsOpen] = useState(false);

  const userName = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/");
  };

  return (
    <nav className=" bg-blue-primary flex justify-between items-center p-5 rounded-2xl m-5 ">
      <Link className="text-white font-bold text-3xl" to="/">
        PropertEase
      </Link>
      <div className="lg:hidden" onClick={toggleMenu}>
        {isOpen ? (
          <FaTimes className="text-white text-3xl cursor-pointer" />
        ) : (
          <FaBars className="text-white text-3xl cursor-pointer" />
        )}
      </div>
      <div
        className={`lg:flex ${
          isOpen ? "flex" : "hidden"
        } flex-col lg:flex-row lg:items-center w-full lg:w-auto`}
      >
        <Link
          to="/properti-dijual"
          className=" text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        >
          Dijual
        </Link>
        <Link
          to="/properti-disewakan"
          className=" text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        >
          Disewakan
        </Link>
        <Link
          to="/pasang-iklan"
          className="text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        >
          Pasang Iklan
        </Link>
        <Link
          to="/iklan-saya"
          className="text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        >
          Iklan Saya
        </Link>
        {tokenLocal && userName ? (
          <>
            <Link
              to="/update-profile"
              className="text-blue-primary bg-white rounded-lg py-2 px-4 hover:bg-black hover:text-white font-semibold"
            >
              {userName}
            </Link>
            <Link
              to="/"
              onClick={handleLogout}
              className="text-blue-primary bg-white rounded-lg py-2 px-4 hover:bg-black hover:text-white font-semibold"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-blue-primary bg-white rounded-lg py-2 px-4 hover:bg-black hover:text-white font-semibold"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

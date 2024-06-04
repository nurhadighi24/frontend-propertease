import React from "react";
import Button from "./button";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { label } = props;
  return (
    <nav className=" bg-blue-primary flex justify-between items-center p-5 rounded-2xl m-5 sticky top-2">
      <Link className="text-white font-bold text-3xl" to="/">
        PropertEase
      </Link>
      <div>
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
        <Link
          to="/login"
          className="text-blue-primary bg-white rounded-lg py-2 px-4 hover:bg-black hover:text-white font-semibold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

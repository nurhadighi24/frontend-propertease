import React from "react";
import Button from "./button";

export default function Navbar(props) {
  const { label } = props;
  return (
    <nav className=" bg-blue-primary flex justify-between items-center p-5 rounded-2xl m-5">
      <div className="text-white font-bold text-3xl">PropertEase</div>
      <div>
        <Button
          label="Dijual"
          className=" text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        />
        <Button
          label="Disewakan"
          className=" text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        />
        <Button
          label="Pasang Iklan"
          className="text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        />
        <Button
          label="Iklan Saya"
          className="text-white px-4 hover:text-blue-primary hover:bg-white rounded-lg py-2 font-semibold"
        />
        <Button
          to="/login"
          label="Login"
          className="text-blue-primary bg-white rounded-lg py-2 px-4 hover:bg-black hover:text-white font-semibold"
        />
      </div>
    </nav>
  );
}

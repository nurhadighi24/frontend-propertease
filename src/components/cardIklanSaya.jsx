import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "./button";
import { FaTrashAlt } from "react-icons/fa";

export default function CardIklanSaya({
  src,
  alt,
  titles,
  location,
  description,
  price,
  onClickEdit,
  onClickDelete,
}) {
  return (
    <div className="flex justify-center items-center mx-5 gap-3 my-10 border rounded-xl shadow-2xl">
      <div className=" w-2/6">
        <img src={src} alt={alt} className=" rounded-xl" />
      </div>
      <div>
        <p className="text-blue-secondary font-bold text-4xl">{titles}</p>
        <div className="flex items-center gap-1 my-3">
          <FaLocationDot className="text-blue-secondary" />
          <p className=" font-bold">{location}</p>
        </div>
        <p>{description}</p>
        <p className="font-bold text-4xl my-3">{price}</p>
        <div className=" flex items-center justify-center gap-5">
          <Link
            onClick={onClickEdit}
            className="border border-blue-secondary rounded-xl text-white px-5 py-2 text-xl flex items-center gap-5 bg-green-edit"
          >
            <BsFillPencilFill />
            <p>Edit</p>
          </Link>
          <Button
            onClick={onClickDelete}
            className="flex items-center bg-red-delete px-3 py-2 rounded-xl text-xl text-white"
            label="Hapus"
            icon={<FaTrashAlt />}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/utils/store/cart";

export default function PacketListCart(props) {
  const carts = useSelector((store) => store.cart.items);

  const { id, titles, quota, price } = props;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        packetId: id,
        quantity: 1,
      })
    );
  };

  return (
    <div className="p-5 m-5 rounded-xl bg-gray-300 w-fit">
      <p className=" text-blue-primary">{titles}</p>
      <p>
        Kuota <span className=" text-blue-secondary">{quota}</span> Iklan
      </p>
      <p className="text-xl">{price}</p>
      <CiSquarePlus
        className="text-3xl text-blue-secondary cursor-pointer"
        onClick={handleAddToCart}
      />
    </div>
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./button";
import CartItem from "./cartItem";
import { toggleStatusTab, clearCart } from "@/utils/store/cart";
import formatCurrency from "@/utils/currencyIdr";
import { packets } from "@/utils/apis/packetList";

export default function CartTab() {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return carts.reduce((total, packet) => {
      const packetDetail = packets.find((p) => p.id === packet.packetId);
      return total + packetDetail.price * packet.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div
      className={` fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 grid grid-rows-[60px_1fr_60px] transform transition-transform duration-500 ${
        statusTab === false ? "translate-x-full" : ""
      }`}
    >
      <h2 className="p-5 text-white text-2xl">Pembelian</h2>
      <div>
        {carts.map((packet, key) => (
          <CartItem
            key={key}
            packetId={packet.packetId} // Pastikan menggunakan packetId
            quantity={packet.quantity} // Pastikan menggunakan quantity
          />
        ))}
      </div>
      <div>
        <p className="text-2xl text-white">
          Total Harga: {formatCurrency(totalPrice)}
        </p>
      </div>
      <div>
        <Button
          className="text-2xl text-white bg-red-500 w-fit px-5 py-2"
          label="Hapus Semua"
          onClick={handleClearCart}
        ></Button>
      </div>
      <div className="grid grid-cols-2">
        <Button
          label="TUTUP"
          className=" bg-black text-white py-4"
          onClick={handleCloseTabCart}
        />
        <Button label="CHECKOUT" className="bg-blue-secondary  text-white" />
      </div>
    </div>
  );
}

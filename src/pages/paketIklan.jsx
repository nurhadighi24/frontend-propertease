import CartTab from "@/components/cartTab";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PacketListCart from "@/components/packetListCart";
import { packets } from "@/utils/apis/packetList";
import formatCurrency from "@/utils/currencyIdr";
import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "@/utils/store/cart";
import { Link } from "react-router-dom";

export default function PaketIklan() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  return (
    <>
      <Navbar />
      <div
        className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative m-5 cursor-pointer"
        onClick={handleOpenTabCart}
      >
        <TiShoppingCart />
        <span className=" absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
          {totalQuantity}
        </span>
      </div>
      <Link
        to="/riwayat-transaksi"
        className=" bg-slate-500 text-white px-3 py-2 rounded-lg m-5"
      >
        riwayat transaksi
      </Link>
      <div className=" grid grid-cols-2">
        {packets.map((packet) => (
          <PacketListCart
            key={packet.id}
            id={packet.id}
            quota={packet.quota}
            titles={packet.name}
            price={formatCurrency(packet.price)}
          />
        ))}
      </div>
      <CartTab />
      <Footer />
    </>
  );
}

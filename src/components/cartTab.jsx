import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./button";
import CartItem from "./cartItem";
import { toggleStatusTab, clearCart } from "@/utils/store/cart";
import formatCurrency from "@/utils/currencyIdr";
import { packets } from "@/utils/apis/packetList";
import { paymentWithMidtrans } from "@/utils/apis/paymentGateway/paymentGateway";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import { getProfile } from "@/utils/apis/profile/profile";
import { useToken } from "@/utils/context/tokenContext";

export default function CartTab() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState("");
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const { tokenLocal } = useToken();
  const dispatch = useDispatch();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const result = await getProfile();
      setProfile(result.data);

      console.log(result.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  }
  const calculateTotalPrice = () => {
    return carts.reduce((total, packet) => {
      const packetDetail = packets.find((p) => p.id === packet.packetId);
      return total + packetDetail.price * packet.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  async function handleCheckout() {
    try {
      const data = {
        total_price: totalPrice, // gunakan totalPrice yang sudah dihitung sebelumnya
        items: carts.map((cart) => ({
          packetId: cart.packetId,
          packetPrice: packets.find((p) => p.id === cart.packetId).price,
          quantity: cart.quantity,
          name: packets.find((p) => p.id === cart.packetId).name,
        })),
        customers: [
          {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
          },
        ],
      };
      const result = await paymentWithMidtrans(data);

      setToken(result.token);
    } catch (error) {
      console.error("Checkout error:", error); // Log the error
    }
  }

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          dispatch(clearCart()); // Clear the cart in Redux store
          localStorage.removeItem("carts"); // Clear the cart in localStorage
          setToken("");
        },
        onPending: (result) => {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          dispatch(clearCart()); // Clear the cart in Redux store
          localStorage.removeItem("carts"); // Clear the cart in localStorage
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

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
        <Button
          label="CHECKOUT"
          className="bg-blue-secondary  text-white"
          onClick={handleCheckout}
        />
      </div>
    </div>
  );
}

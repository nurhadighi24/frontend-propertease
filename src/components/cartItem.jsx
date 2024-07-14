import React, { useEffect, useState } from "react";
import { packets } from "@/utils/apis/packetList";
import formatCurrency from "@/utils/currencyIdr";
import Button from "./button";
import { useDispatch } from "react-redux";
import { changeQuantity } from "@/utils/store/cart";

export default function CartItem(props) {
  const { packetId, quantity } = props;
  const [detail, setDetail] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const findDetail = packets.filter((packet) => packet.id === packetId)[0];
    setDetail(findDetail);
  }, [packetId]);

  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        packetId: packetId,
        quantity: quantity - 1,
      })
    );
  };

  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        packetId: packetId,
        quantity: quantity + 1,
      })
    );
  };

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5">
      <h3 className="text-white">{detail.name}</h3>
      <p>
        Kuota{" "}
        <span className="text-blue-secondary">{detail.quota * quantity}</span>{" "}
        Iklan
      </p>
      <p>{formatCurrency(detail.price * quantity)}</p>
      <div className="w-20 flex justify-between">
        <Button
          label="-"
          className="bg-gray-200 rounded-full w-6  text-cyan-600"
          onClick={handleMinusQuantity}
        />
        <span>{quantity}</span>
        <Button
          label="+"
          className="bg-gray-200 rounded-full w-6  text-cyan-600"
          onClick={handlePlusQuantity}
        />
      </div>
    </div>
  );
}

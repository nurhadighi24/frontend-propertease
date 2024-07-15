// components/TransactionHistory.js
import React, { useEffect, useState } from "react";
import { getTransactions } from "@/utils/indexedDb";
import formatCurrency from "@/utils/currencyIdr";
import Navbar from "@/components/navbar";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const savedTransactions = await getTransactions();
      setTransactions(savedTransactions);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className=" w-fit m-5">
        <h2 className="text-2xl my-5">Riwayat Transaksi</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className="border p-2 my-2 rounded-lg bg-slate-500 px-3 py-2"
            >
              <p>
                Customer:{" "}
                <span className="text-white">
                  {transaction.customers[0].name}
                </span>
              </p>
              <p>
                Email:{" "}
                <span className="text-white">
                  {transaction.customers[0].email}
                </span>
              </p>
              <p>Items:</p>
              <ul>
                {transaction.items.map((item, idx) => (
                  <li key={idx} className="text-white">
                    {item.name} - {item.quantity} x{" "}
                    {formatCurrency(item.packetPrice)}
                  </li>
                ))}
              </ul>
              <p>
                Total Harga:{" "}
                <span className="text-white">
                  {formatCurrency(transaction.total_price)}
                </span>{" "}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

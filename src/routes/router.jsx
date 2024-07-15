import ChoosenProperty from "@/pages/choosenProperty";
import DetailProperty from "@/pages/detailProperty";
import Home from "@/pages/home";
import IklanSaya from "@/pages/iklanSaya";
import Login from "@/pages/login";
import PaketIklan from "@/pages/paketIklan";
import PasangIklan from "@/pages/pasangIklan";
import Register from "@/pages/register";
import RentProperty from "@/pages/rentProperty";
import SaleProperty from "@/pages/saleProperty";
import TransactionHistory from "@/pages/transactionHistory";
import UpdateProfile from "@/pages/updateProfile";
import { useToken } from "@/utils/context/tokenContext";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Router() {
  const { tokenLocal } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/properti-pilihan",
      element: <ChoosenProperty />,
    },
    {
      path: "/detail-properti/:id/:slug",
      element: <DetailProperty />,
    },
    {
      path: "/properti-dijual",
      element: <SaleProperty />,
    },
    {
      path: "/properti-disewakan",
      element: <RentProperty />,
    },
    {
      path: "/paket-iklan",
      element: <PaketIklan />,
    },
    {
      path: "/riwayat-transaksi",
      element: <TransactionHistory />,
    },
    {
      path: "/iklan-saya",
      element: tokenLocal ? <IklanSaya /> : <Navigate to="/login" />,
    },
    {
      path: "/update-profile",
      element: <UpdateProfile />,
    },
    {
      path: "/pasang-iklan/:id/edit-property",
      element: <PasangIklan />,
    },
    {
      path: "/pasang-iklan",
      element: tokenLocal ? <PasangIklan /> : <Navigate to="/login" />,
    },
  ]);
  return <RouterProvider router={router} />;
}

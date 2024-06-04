import ChoosenProperty from "@/pages/choosenProperty";
import DetailProperty from "@/pages/detailProperty";
import Home from "@/pages/home";
import IklanSaya from "@/pages/iklanSaya";
import Login from "@/pages/login";
import PasangIklan from "@/pages/pasangIklan";
import Register from "@/pages/register";
import RentProperty from "@/pages/rentProperty";
import SaleProperty from "@/pages/saleProperty";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export default function Router() {
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
      path: "/detail-properti",
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
      path: "/pasang-iklan",
      element: <PasangIklan />,
    },
    {
      path: "/iklan-saya",
      element: <IklanSaya />,
    },
  ]);
  return <RouterProvider router={router} />;
}

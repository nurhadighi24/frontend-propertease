import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import Footer from "@/components/footer";
import { getDetailProperties } from "@/utils/apis/property/properties";
import formatCurrency from "@/utils/currencyIdr";
import { Loading } from "@/components/loading";
import { useToken } from "@/utils/context/tokenContext";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import MapInput from "@/components/map/mapInput";
import MapDetail from "@/components/map/mapDetail";
import ReactWhatsapp from "react-whatsapp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { simulateKpr } from "@/utils/apis/KPR/simulateKRP";
import { Input } from "@/components/ui/input";
import Button from "@/components/button";

const schema = z.object({
  propertyPrice: z.string().min(1, { message: "Harga properti harus diisi" }),
  downPayment: z.string().min(1, { message: "Uang muka harus diisi" }),
  interestRate: z.string().min(1, { message: "Suka bunga harus diisi" }),
  timePeriod: z.string().min(1, { message: "Jangka Waktu harus diisi" }),
});

export default function DetailProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulatedKpr, setSimulatedKpr] = useState("");
  const { tokenLocal } = useToken();

  const { id, slug } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailProperties(id, slug);
      setProperties(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      const newSimulate = {
        harga_properti: data.propertyPrice,
        uang_muka: data.downPayment,
        suku_bunga: data.interestRate,
        jangka_waktu: data.timePeriod,
      };
      const result = await simulateKpr(newSimulate);
      setSimulatedKpr(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const phoneWithCountryCode = properties?.user?.phone
    ? `+62${properties.user.phone}`
    : "";

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-5">
          <div className="flex items-center">
            <div className="w-3/5">
              <div>
                <img
                  src={`https://skkm.online/storage/${properties.image}`}
                  alt="Gambar Detail Properti"
                  className=" rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className=" text-3xl font-bold">{properties.name}</p>
                <p className=" text-2xl font-bold">
                  {formatCurrency(properties.price)}
                </p>
              </div>
              <div className="">
                <div className=" flex gap-1 items-center">
                  <FaLocationDot className="text-blue-secondary" />
                  <p className=" font-bold">
                    Provinsi {properties.province}, Kota/Kabupaten{" "}
                    {properties.city}, Kelurahan {properties.district}
                  </p>
                </div>
                <p className="font-bold mb-3">{properties.address}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Kamar Tidur</p>
                <p className="font-bold">{properties.bedrooms}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Kamar Mandi</p>
                <p className="font-bold">{properties.bathrooms}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Furnished</p>
                <p className="font-bold">{properties.furnished}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Luas Bangunan</p>
                <p className="font-bold">{properties.building_area}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Luas Tanah</p>
                <p className="font-bold">{properties.land_area}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Garasi</p>
                <p className="font-bold">{properties.garage}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p>Jumlah Lantai</p>
                <p className="font-bold">{properties.jumlah_lantai}</p>
              </div>
              {properties.latitude !== null &&
                properties.longitude !== null && (
                  <MapDetail
                    lat={properties.latitude}
                    lng={properties.longitude}
                    mapCenter={[properties.latitude, properties.longitude]}
                  />
                )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl mx-5 my-5">Simulasi KPR</p>
                <div className=" w-1/2 m-5">
                  <Input
                    className="my-5"
                    placeholder="Harga Properti"
                    type="text"
                    name="propertyPrice"
                    register={register}
                    error={errors.propertyPrice?.message}
                  />
                  <Input
                    className="my-5"
                    placeholder="Uang Muka"
                    type="text"
                    name="downPayment"
                    register={register}
                    error={errors.downPayment?.message}
                  />
                  <Input
                    className="my-5"
                    placeholder="Suku Bunga (%)"
                    type="text"
                    name="interestRate"
                    register={register}
                    error={errors.interestRate?.message}
                  />
                  <Input
                    className="my-5"
                    placeholder="Jangka Waktu (Tahun)"
                    type="text"
                    name="timePeriod"
                    register={register}
                    error={errors.timePeriod?.message}
                  />
                </div>

                <Button
                  label="SIMULASIKAN"
                  className="text-white bg-blue-secondary w-80 m-5 py-2 text-center rounded-lg"
                />

                {simulatedKpr && (
                  <div className=" w-fit m-5 bg-slate-600 rounded p-5 text-white">
                    <p className="text-xl mb-3">Hasil Simulasi KPR</p>
                    <p className="mb-3">
                      Angsuran Bulanan: {simulatedKpr.angsuran_bulanan}
                    </p>
                    <p className="mb-3">
                      Jumlah Pinjaman: {simulatedKpr.jumlah_pinjaman}
                    </p>
                  </div>
                )}
              </form>
              <div className="border rounded-lg bg-gray-primary p-3 my-5">
                <p className="font-bold">DESKRIPSI SELENGKAPNYA</p>
                <p>{properties.description}</p>
              </div>
            </div>
            <div className="flex justify-center w-2/5">
              <div className="shadow-xl p-6 rounded-lg border">
                <p className="text-center pb-5 font-bold text-5xl">
                  {properties.user.name}
                </p>
                <ReactWhatsapp
                  number={phoneWithCountryCode}
                  message={`Halo, ${properties.user.name} saya tertarik dengan properti ${properties.name}`}
                >
                  <div className="flex items-center bg-green-primary px-3 py-2 rounded-xl text-xl">
                    <IoLogoWhatsapp className="text-white" />
                    <p className="text-white">Whatsapp</p>
                  </div>
                </ReactWhatsapp>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

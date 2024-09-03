import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { FaLocationDot, FaShower } from "react-icons/fa6";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaBed, FaBuilding, FaCar } from "react-icons/fa";
import { Gi3dStairs, GiPoland, GiSofa } from "react-icons/gi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactGA from "react-ga4";

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

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: `/detail-properti/${id}/${slug}`,
    });
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
          <div className="flex gap-5">
            <div className="w-2/3">
              <div>
                <Swiper
                  navigation={true}
                  modules={[Navigation, Pagination]}
                  pagination={pagination}
                  className=""
                >
                  {properties.image_properties.map((imageObj, index) => (
                    <SwiperSlide key={imageObj.id}>
                      <img
                        src={`https://skkm.online/storage/${imageObj.image}`}
                        alt={`Gambar Detail Properti ${index + 1}`}
                        className="rounded-lg w-full h-[32rem]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex  justify-between mt-3">
                  <p className=" text-3xl font-bold text-blue-primary">
                    {properties.name}
                  </p>
                  <p className=" text-3xl font-bold">
                    {formatCurrency(properties.price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/3">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaBed className="text-2xl" />
                  <p>Kamar Tidur</p>
                  <p className="font-bold">{properties.bedrooms}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <FaShower className="text-2xl" />
                  <p>Kamar Mandi</p>
                  <p className="font-bold">{properties.bathrooms}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <GiSofa className="text-2xl" />
                  <p>Furnished</p>
                  <p className="font-bold">{properties.furnished}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <FaBuilding className="text-2xl" />
                  <p>Luas Bangunan</p>
                  <p className="font-bold">{properties.building_area}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <GiPoland className="text-2xl" />
                  <p>Luas Tanah</p>
                  <p className="font-bold">{properties.land_area}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <FaCar className="text-2xl" />
                  <p>Garasi</p>
                  <p className="font-bold">{properties.garage}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Gi3dStairs className="text-2xl" />
                  <p>Jumlah Lantai</p>
                  <p className="font-bold">{properties.jumlah_lantai}</p>
                </div>
              </div>
              <div className="shadow-xl p-6 rounded-lg border text-center">
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
          {/* Map and Address Section */}
          <div className="mt-5">
            <div className="flex items-center gap-5">
              {/* Map Section */}
              <div className="w-1/2">
                {properties.latitude !== null &&
                  properties.longitude !== null && (
                    <MapDetail
                      lat={properties.latitude}
                      lng={properties.longitude}
                      mapCenter={[properties.latitude, properties.longitude]}
                    />
                  )}
              </div>

              {/* Address Section */}
              <div className="w-1/2 text-center">
                <div className="flex gap-1 mb-3">
                  {/* <FaLocationDot className="text-blue-secondary mt-1" /> */}
                  <p className="font-bold text-xl">
                    Provinsi {properties.province}, Kota/Kabupaten{" "}
                    {properties.city}, Kelurahan {properties.district},
                    Kecamatan {properties.kecamatan}
                  </p>
                </div>
                <p className="font-bold text-xl mb-3">{properties.address}</p>
                <a
                  href={properties.gmaps_link}
                  className="text-3xl text-blue-500"
                  target="_blank" // Membuka link di tab baru
                  rel="noopener noreferrer" // Menjaga keamanan link
                >
                  Link Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Bagian bawah seperti deskripsi properti, KPR simulation, dll. */}
          <div className="my-5">
            <p className="font-bold text-xl">DESKRIPSI SELENGKAPNYA</p>
            <div className="border rounded-lg bg-gray-primary p-3 my-5">
              <p style={{ whiteSpace: "pre-wrap" }}>{properties.description}</p>
              <a
                href={properties.other_links}
                className="text-xl text-blue-500"
                target="_blank" // Membuka link di tab baru
                rel="noopener noreferrer" // Menjaga keamanan link
              >
                {properties.other_links}
              </a>
            </div>
          </div>

          {/* Bagian simulasi KPR */}
          <p className="text-xl my-5">Simulasi KPR</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-around"
          >
            <div className="flex items-center gap-7">
              <div>
                <div className="flex items-center gap-2">
                  <img src="/logo-bca.png" alt="" className="w-20" />
                  <p>KPR Bank BCA 2.79% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo-dki.png" alt="" className="w-20" />
                  <p>KPR Bank DKI 4.56% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo-bni.png" alt="" className="w-20" />
                  <p>KPR Bank BNI 2.75% 1 Tahun</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src="/logo-permata.png" alt="" className="w-20" />
                  <p>KPR Bank Permata 9.75% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2 my-5">
                  <img src="/logo-bri.png" alt="" className="w-20" />
                  <p>KPR Bank BRI 3.25% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo-mandiri.png" alt="" className="w-20" />
                  <p>KPR Bank Mandiri 14.25% 1 Tahun</p>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <Input
                className="my-5"
                placeholder="Harga Properti"
                type="text"
                name="propertyPrice"
                defaultValue={properties.price}
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
              <p>{formatCurrency(watch("downPayment"))}</p>
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
              <Button
                label="SIMULASIKAN"
                className="text-white bg-blue-secondary w-80 my-5 py-2 text-center rounded-lg"
              />
            </div>

            {simulatedKpr && (
              <div className="w-fit bg-slate-600 rounded p-5 text-white">
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
        </div>
      )}
      <Footer />
    </>
  );
}

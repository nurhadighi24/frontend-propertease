import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import Footer from "@/components/footer";
import { getDetailProperties } from "@/utils/apis/property/properties";
import formatCurrency from "@/utils/currencyIdr";
import { Loading } from "@/components/loading";

export default function DetailProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id, slug } = useParams();

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
              <div className="flex items-center gap-3 my-2">
                <FaLocationDot className="text-blue-secondary" />
                <p className="font-bold">{properties.address}</p>
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
              <div className="border rounded-lg bg-gray-primary p-3">
                <p className="font-bold">DESKRIPSI SELENGKAPNYA</p>
                <p>{properties.description}</p>
              </div>
            </div>
            <div className="flex justify-center w-2/5">
              <div className="shadow-xl p-6 rounded-lg border">
                <p className="text-center pb-5 font-bold text-5xl">ANAIS</p>
                <Link className="flex items-center bg-green-primary px-3 py-2 rounded-xl text-xl">
                  <IoLogoWhatsapp className="text-white" />
                  <p className="text-white">Whatsapp</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

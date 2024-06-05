import Button from "@/components/button";
import Footer from "@/components/footer";
import MapInput from "@/components/map/mapInput";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getProvinces } from "@/utils/apis/wilayahIndonesia";
import { useEffect, useState } from "react";

import { IoCloudUpload } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function PasangIklan() {
  const [provinces, setProvinces] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleLatLngChange = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
  };

  useEffect(() => {
    fetchDataProvinces();
  }, []);

  async function fetchDataProvinces() {
    try {
      const result = await getProvinces();
      setProvinces(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <form className="m-20" onSubmit={handleSubmit}>
        <p className=" text-5xl font-bold">
          Properti yang ingin anda tawarkan?
        </p>
        <p className="mt-3 mb-10">
          Silahkan lengkapi data properti yang anda tawarkan
        </p>
        <p className="font-bold">
          Jenis Tawaran <span className="text-red-600">*</span>
        </p>
        <RadioGroup
          defaultValue="jual"
          className="flex items-center border-2 border-gray-400  rounded-xl w-max mb-2"
        >
          <div className="flex items-center ">
            <RadioGroupItem value="jual" id="jual" className="hidden" />
            <label
              htmlFor="jual"
              className=" cursor-pointer px-20 rounded-xl transition duration-300 py-1"
            >
              Jual
            </label>
          </div>
          <div className=" flex items-center">
            <RadioGroupItem value="sewa" id="sewa" className="hidden" />
            <label
              htmlFor="sewa"
              className=" cursor-pointer px-20 rounded-xl transition duration-300 py-1"
            >
              Sewa
            </label>
          </div>
        </RadioGroup>
        <div className="flex items-center">
          <p className="font-bold">Masa Sewa </p>
          <p>(jika memilih opsi sewa)</p>
        </div>
        <Input
          type="text"
          placeholder="Tahunan / Bulanan"
          className="w-max mb-3"
        />
        <p className="font-bold">
          Tipe Properti <span className="text-red-600">*</span>
        </p>
        <RadioGroup
          defaultValue="rumah"
          className="flex items-center border-2 border-gray-400  rounded-xl w-max mb-5"
        >
          <div className="flex items-center ">
            <RadioGroupItem value="rumah" id="rumah" className="hidden" />
            <label
              htmlFor="rumah"
              className=" cursor-pointer px-20 rounded-xl transition duration-300 py-1"
            >
              Rumah
            </label>
          </div>
          <div className=" flex items-center">
            <RadioGroupItem
              value="apartemen"
              id="apartemen"
              className="hidden"
            />
            <label
              htmlFor="apartemen"
              className=" cursor-pointer px-20 rounded-xl transition duration-300 py-1"
            >
              Apartemen
            </label>
          </div>
          <div className=" flex items-center">
            <RadioGroupItem value="Tanah" id="Tanah" className="hidden" />
            <label
              htmlFor="Tanah"
              className=" cursor-pointer px-20 rounded-xl transition duration-300 py-1"
            >
              Tanah
            </label>
          </div>
        </RadioGroup>
        <p className="font-bold">
          Nama Properti <span className="text-red-600">*</span>
        </p>
        <Input
          type="text"
          placeholder="Riverside Residence"
          className="w-4/6 mb-3"
        />
        <p className="font-bold">
          Deskripsi <span className="text-red-600">*</span>
        </p>
        <Textarea
          placeholder="Deskripsi lengkap properti anda"
          className="w-4/6 mb-10"
        />
        <p className="font-bold text-3xl">Tambahkan Detail Informasi</p>
        <p className="mb-3">
          Silahkan tambahkan detail informasi seperti harga, jumlah kamar, dan
          informasi lainnya.
        </p>
        <div className="w-4/6 flex items-center gap-32 mb-10">
          <div>
            <p className="font-bold">
              Harga (Rp)<span className="text-red-600">*</span>
            </p>
            <Input type="number" placeholder="100000000" className="" />
          </div>
          <div>
            <p className="font-bold">Fully Furnished?</p>
            <RadioGroup
              defaultValue="ya"
              className="flex items-center border-2 border-gray-400  rounded-xl w-max "
            >
              <div className="flex items-center ">
                <RadioGroupItem value="ya" id="ya" className="hidden" />
                <label
                  htmlFor="ya"
                  className=" cursor-pointer px-10 rounded-xl transition duration-300 py-1"
                >
                  Ya
                </label>
              </div>
              <div className=" flex items-center">
                <RadioGroupItem value="tidak" id="tidak" className="hidden" />
                <label
                  htmlFor="tidak"
                  className=" cursor-pointer px-10 rounded-xl transition duration-300 py-1"
                >
                  Tidak
                </label>
              </div>
              <div className=" flex items-center">
                <RadioGroupItem value="semi" id="semi" className="hidden" />
                <label
                  htmlFor="semi"
                  className=" cursor-pointer px-10 rounded-xl transition duration-300 py-1"
                >
                  Semi
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <p className="font-bold text-3xl">Di mana lokasinya?</p>
        <p className="mb-3">
          Untuk memudahkan pembeli menemukan lokasi properti yang anda tawarkan,
          berikan lokasi selengkapnya.
        </p>
        <div className="w-4/6">
          <div>
            <p className="font-bold">
              Provinsi <span className="text-red-600">*</span>
            </p>
            <Select>
              <SelectTrigger className="w-max">
                <SelectValue placeholder="Provinsi" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.code} value={province.name}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="font-bold">
              Kota/Kabupaten <span className="text-red-600">*</span>
            </p>
            <Input type="text" className="w-max" />
          </div>

          <div>
            <p className="font-bold">
              Kelurahan <span className="text-red-600">*</span>
            </p>
            <Input type="text" className="w-max" />
          </div>
          <div>
            <p className="font-bold">
              Alamat Lengkap <span className="text-red-600">*</span>
            </p>
            <Input type="text" className="w-3/6 mb-10" />
          </div>
        </div>
        <div className="flex items-center w-max gap-5">
          <Input
            placeholder="Latitude"
            value={lat || ""}
            onChange={(e) => setLat(e.target.value)}
          />
          <Input
            placeholder="Longitude"
            value={lng || ""}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div className="my-5">
          <MapInput lat={lat} lng={lng} onLatLngChange={handleLatLngChange} />
        </div>
        <div>
          <p className="font-bold text-3xl">
            Unggah gambar dan kebutuhan media lainnya
          </p>
          <p className="mb-3">
            Berikan informasi penunjang lain agar pembeli tertarik untuk membeli
            properti yang Anda tawarkan. Anda bisa unggah gambar, video, dan
            media penunjang lainnya!
          </p>
          <div className="">
            <p className="font-bold">
              Unggah Foto <span className="text-red-600">*</span>
            </p>
            <label className="w-max h-[12rem] flex flex-col items-center justify-center p-2 mb-2 text-blue tracking-wide   border-blue hover:bg-blue border-2 bg-white border-black rounded cursor-pointer">
              <div className="flex items-center p-10 gap-3">
                <IoCloudUpload className=" text-6xl text-blue-secondary" />
                <div className="flex flex-col">
                  <p className=" text-gray-secondary">
                    Unggah foto properti anda di sini.
                  </p>
                  <p className=" text-gray-secondary">
                    {" "}
                    Unggah foto dalam bentuk jpg atau png
                  </p>
                </div>
              </div>

              <Input
                id="inputImageProducts"
                type="file"
                className="hidden"
                multiple
              />
            </label>
          </div>
          <div>
            <p className="font-bold">Tempelkan URL (Opsional)</p>
            <Input type="url" className="w-3/6" />
          </div>
        </div>
        <div className="flex items-center justify-evenly w-4/6 mt-5">
          <Link
            to="/"
            className="bg-white border-2 border-blue-secondary text-blue-secondary rounded-xl px-20 py-1 hover:shadow-2xl text-xl hover:scale-125 transition"
          >
            Batalkan
          </Link>
          <Button
            label="Publikasi Properti"
            className="text-white bg-blue-secondary rounded-xl px-20 py-1 hover:shadow-2xl text-xl hover:scale-125 transition"
          />
        </div>
      </form>
      <Footer />
    </>
  );
}

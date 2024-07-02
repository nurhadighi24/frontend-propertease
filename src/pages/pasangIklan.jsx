import Button from "@/components/button";
import Footer from "@/components/footer";
import MapInput from "@/components/map/mapInput";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

import { IoCloudUpload } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createProperty } from "@/utils/apis/property/pasangIklan";
import { useToast } from "@/components/ui/use-toast";
import { FaRegCheckCircle } from "react-icons/fa";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useToken } from "@/utils/context/tokenContext";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import CustomRadioGroup from "@/components/radioButton";

const schema = z.object({
  propertyName: z.string().min(1, { message: "Nama Properti harus diisi" }),
  propertyDescription: z
    .string()
    .min(1, { message: "Deskripsi Properti harus diisi" }),
  propertyPrice: z.number().min(1, { message: "Harga Properti harus diisi" }),
  propertyBedroom: z.number().min(0),
  propertyBathroom: z.number().min(0),
  propertyBuildingArea: z.number().min(0),
  propertyLandArea: z.number().min(0),
  propertyGarage: z.number().min(0),
  propertyProvince: z
    .string()
    .min(1, { message: "Provinsi Properti harus diisi" }),
  propertyCity: z
    .string()
    .min(1, { message: "Kota/Kabupaten Properti harus diisi" }),
  propertyDistrict: z.string().min(1, { message: "Kelurahan Harus Diisi" }),
  propertyAddress: z.string().min(1, { message: "Alamat Lengkap harus diisi" }),
  propertyOfferType: z.enum(["jual", "sewa"]),
  propertyType: z.enum(["rumah", "apartement", "tanah"]),
  propertyFurnished: z.enum(["ya", "tidak", "semi"]),
  rentalPeriod: z.string().optional(),
});

export default function PasangIklan() {
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOfferType, setSelectedOfferType] = useState("jual");
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tokenLocal } = useToken();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(schema) });

  const handleLatLngChange = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
  };

  const rentalSchema = schema.refine(
    (data) => data.propertyOfferType === "jual" || data.rentalPeriod,
    {
      message: "Masa Sewa harus diisi jika memilih opsi sewa",
      path: ["rentalPeriod"],
    }
  );

  useEffect(() => {
    setSelectedOfferType(watch("propertyOfferType"));
  }, [watch("propertyOfferType")]);

  async function onSubmit(data) {
    try {
      setLoading(true);
      const newProperty = {
        name: data.propertyName,
        description: data.propertyDescription,
        price: parseInt(data.propertyPrice),
        bedrooms: parseInt(data.propertyBedroom),
        bathrooms: parseInt(data.propertyBathroom),
        building_area: parseInt(data.propertyBuildingArea),
        land_area: parseInt(data.propertyLandArea),
        garage: parseInt(data.propertyGarage),
        province: data.propertyProvince,
        city: data.propertyCity,
        district: data.propertyDistrict,
        address: data.propertyAddress,
        offer_type: data.propertyOfferType,
        property_type: data.propertyType,
        furnished: data.propertyFurnished,
      };
      setAxiosConfig(tokenLocal, "https://skkm.online");
      await createProperty(newProperty, selectedImage);
      setLoading(false);
      navigate("/");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Berhasil Membuat Properti!
            </span>
          </div>
        ),
      });
      reset();
    } catch (error) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">Gagal Membuat Properti!</span>
          </div>
        ),
        description: "Pastikan Terisi semua yang  diinginkan",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <form
        className="m-20"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <p className=" text-5xl font-bold">
          Properti yang ingin anda tawarkan?
        </p>
        <p className="mt-3 mb-10">
          Silahkan lengkapi data properti yang anda tawarkan
        </p>
        <p className="font-bold">
          Jenis Tawaran <span className="text-red-600">*</span>
        </p>
        <CustomRadioGroup
          className="flex items-center border-2 border-gray-400 rounded-xl w-max mb-2"
          options={[
            { name: "propertyOfferType", value: "jual", label: "Jual" },
            { name: "propertyOfferType", value: "sewa", label: "Sewa" },
          ]}
          register={register}
        />
        {selectedOfferType === "sewa" && (
          <>
            <div className="flex items-center">
              <p className="font-bold">Masa Sewa </p>
              <p>(jika memilih opsi sewa)</p>
            </div>

            <Input
              type="text"
              placeholder="Tahunan / Bulanan"
              className="w-max mb-3"
            />
          </>
        )}
        <p className="font-bold">
          Tipe Properti <span className="text-red-600">*</span>
        </p>
        <CustomRadioGroup
          className="flex items-center border-2 border-gray-400 rounded-xl w-max mb-2"
          options={[
            { name: "propertyType", value: "rumah", label: "Rumah" },
            {
              name: "propertyType",
              value: "apartement",
              label: "Apartement",
            },
            { name: "propertyType", value: "tanah", label: "Tanah" },
          ]}
          register={register}
        />

        <p className="font-bold">
          Nama Properti <span className="text-red-600">*</span>
        </p>
        <Input
          type="text"
          placeholder="Riverside Residence"
          className="w-4/6 mb-3"
          id="inputName"
          name="propertyName"
          register={register}
          error={errors.propertyName?.message}
        />
        <p className="font-bold">
          Deskripsi <span className="text-red-600">*</span>
        </p>
        <Textarea
          placeholder="Deskripsi lengkap properti anda"
          className="w-4/6 mb-10"
          name="propertyDescription"
          register={register}
          error={errors.propertyDescription?.message}
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
            <Input
              type="number"
              placeholder="100000000"
              className=""
              name="propertyPrice"
              register={register}
              error={errors.propertyPrice?.message}
            />
          </div>
          <div>
            <p className="font-bold">Fully Furnished?</p>
            <CustomRadioGroup
              className="flex items-center border-2 border-gray-400 rounded-xl w-max mb-2"
              options={[
                { name: "propertyFurnished", value: "ya", label: "Ya" },
                {
                  name: "propertyFurnished",
                  value: "tidak",
                  label: "Tidak",
                },
                { name: "propertyFurnished", value: "semi", label: "Semi" },
              ]}
              register={register}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <p className="font-bold">Kamar Tidur</p>
            <Input
              type="number"
              placeholder="1"
              className=""
              name="propertyBedroom"
              register={register}
              error={errors.propertyBedroom?.message}
            />
          </div>
          <div>
            <p className="font-bold">Kamar Mandi</p>
            <Input
              type="number"
              placeholder="1"
              className=""
              name="propertyBathroom"
              register={register}
              error={errors.propertyBathroom?.message}
            />
          </div>
          <div>
            <p className="font-bold">Luas Bangunan</p>
            <Input
              type="number"
              placeholder="1"
              className=""
              name="propertyBuildingArea"
              register={register}
              error={errors.propertyBuildingArea?.message}
            />
          </div>
          <div>
            <p className="font-bold">Luas Tanah</p>
            <Input
              type="number"
              placeholder="1"
              className=""
              name="propertyLandArea"
              register={register}
              error={errors.propertyLandArea?.message}
            />
          </div>
          <div>
            <p className="font-bold">Garasi</p>
            <Input
              type="number"
              placeholder="1"
              className=""
              name="propertyGarage"
              register={register}
              error={errors.propertyGarage?.message}
            />
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
            <Input
              type="text"
              className="w-max"
              name="propertyProvince"
              register={register}
              error={errors.propertyProvince?.message}
            />
          </div>

          <div>
            <p className="font-bold">
              Kota/Kabupaten <span className="text-red-600">*</span>
            </p>
            <Input
              type="text"
              className="w-max"
              name="propertyCity"
              register={register}
              error={errors.propertyCity?.message}
            />
          </div>

          <div>
            <p className="font-bold">
              Kelurahan <span className="text-red-600">*</span>
            </p>
            <Input
              type="text"
              className="w-max"
              name="propertyDistrict"
              register={register}
              error={errors.propertyDistrict?.message}
            />
          </div>
          <div>
            <p className="font-bold">
              Alamat Lengkap <span className="text-red-600">*</span>
            </p>
            <Input
              type="text"
              className="w-3/6 mb-10"
              name="propertyAddress"
              register={register}
              error={errors.propertyAddress?.message}
            />
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
          <p className="font-bold">
            Unggah Foto <span className="text-red-600">*</span>
          </p>
          <div className="flex">
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
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {previewUrl && (
              <div className="ml-4">
                <img src={previewUrl} alt="Preview" className=" w-60 h-60 " />
              </div>
            )}
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
            type="submit"
            label={loading ? "Memuat..." : "Publikasi Properti"}
            className="text-white bg-blue-secondary rounded-xl px-20 py-1 hover:shadow-2xl text-xl hover:scale-125 transition"
          />
        </div>
      </form>
      <Footer />
    </>
  );
}

import Button from "@/components/button";
import Footer from "@/components/footer";
import MapInput from "@/components/map/mapInput";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

import { IoCloudUpload } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  createImageProperty,
  createProperty,
} from "@/utils/apis/property/pasangIklan";
import { useToast } from "@/components/ui/use-toast";
import { FaRegCheckCircle } from "react-icons/fa";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useToken } from "@/utils/context/tokenContext";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import CustomRadioGroup from "@/components/radioButton";
import { isAfter, parseISO } from "date-fns";
import { getDetailProperties } from "@/utils/apis/property/properties";
import { updateProperty } from "@/utils/apis/property/propertyIklanSaya";
import { Loading } from "@/components/loading";

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
  rentalPeriodStart: z.string().date().optional().or(z.literal("")),
  rentalPeriodEnd: z.string().date().optional().or(z.literal("")),
  latitudeProperty: z.string().min(1, { message: "Latitude harus diisi" }),
  longitudeProperty: z.string().min(1, { message: "Longitude harus diisi" }),
  propertyFloor: z.number().min(0),
  other_links: z.string(),
  gmaps_link: z.string(),
});

const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB

export default function PasangIklan() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(0);
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [selectedOfferType, setSelectedOfferType] = useState("jual");
  const [fileError, setFileError] = useState(""); // State for file error
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tokenLocal } = useToken();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    let validFiles = [];
    let errorMessage = "";

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        // Check file size
        errorMessage = `File ${file.name} is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
      } else {
        validFiles.push(file);
      }
    });

    if (errorMessage) {
      setFileError(errorMessage);
      toast({
        variant: "destructive",
        title: "File Size Error",
        description: errorMessage,
      });
    } else {
      setFileError("");
      setSelectedImage(validFiles);

      const imagePreviews = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewImage(imagePreviews);
    }
  };

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      propertyBathroom: 0,
      propertyBedroom: 0,
      propertyBuildingArea: 0,
      propertyLandArea: 0,
      propertyGarage: 0,
      propertyFloor: 0,
    },
  });

  const handleLatLngChange = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
  };

  useEffect(() => {
    setSelectedOfferType(watch("propertyOfferType"));
  }, [watch("propertyOfferType")]);

  useEffect(() => {
    if (id !== undefined) {
      fetchDataDetail();
    }
  }, []);

  async function fetchDataDetail() {
    try {
      setLoading(true);
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const result = await getDetailProperties(id);
      setProperty(result.data);
      console.log(result.data);
      if (result.data) {
        setSelectedId(result.data.id);
        setValue("propertyName", result.data.name);
        setValue("propertyOfferType", result.data.offer_type);
        setValue("propertyType", result.data.property_type);
        setValue("propertyDescription", result.data.description);
        setValue("propertyPrice", result.data.price);
        setValue("propertyFurnished", result.data.furnished);
        setValue("propertyBedroom", result.data.bedrooms);
        setValue("propertyBathroom", result.data.bathrooms);
        setValue("propertyBuildingArea", result.data.building_area);
        setValue("propertyLandArea", result.data.land_area);
        setValue("propertyGarage", result.data.garage);
        setValue("propertyProvince", result.data.province);
        setValue("propertyCity", result.data.city);
        setValue("propertyDistrict", result.data.district);
        setValue("propertyAddress", result.data.address);
        setValue("propertyImage", result.data.image);
        setValue("rentalPeriodStart", result.data.rental_start_date || "");
        setValue("rentalPeriodEnd", result.data.rental_end_date || "");
        setValue("latitudeProperty", String(result.data.latitude));
        setValue("longitudeProperty", String(result.data.longitude));
        setLat(result.data.latitude);
        setLng(result.data.longitude);
        const imagePreviews = result.data.image_properties.map(
          (img) => `https://skkm.online/storage/${img.image}`
        );
        setPreviewImage(imagePreviews);
        setValue("propertyFloor", result.data.jumlah_lantai);
        setValue("other_links", result.data.other_links);
        setValue("gmaps_link", result.data.gmaps_link);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">Gagal Mendapatkan Produk!</span>
          </div>
        ),
        description:
          "Oh, noo! Sepertinya ada kesalahan saat proses penyimpanan perubahan data, nih. Periksa koneksi mu dan coba lagi, yuk!!",
      });
    } finally {
      setLoading(false);
    }
  }

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
        rental_start_date: data.rentalPeriodStart || "",
        rental_end_date: data.rentalPeriodEnd || "",
        latitude: lat,
        longitude: lng,
        jumlah_lantai: parseInt(data.propertyFloor),
        other_links: data.other_links,
        gmaps_link: data.gmaps_link,
      };
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const propertyResponse = await createProperty(newProperty, null); // Assuming property is created first
      await createImageProperty(
        newProperty,
        selectedImage,
        propertyResponse.data.id
      );
      navigate("/");
      setLoading(false);
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

  async function onSubmitEdit(data) {
    try {
      setLoading(true);
      const editProperty = {
        id: selectedId,
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
        rental_start_date: data.rentalPeriodStart || "",
        rental_end_date: data.rentalPeriodEnd || "",
        latitude: String(lat),
        longitude: String(lng),
        jumlah_lantai: parseInt(data.propertyFloor),
        other_links: data.other_links,
        gmaps_link: data.gmaps_link,
      };
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const propertyResponse = await updateProperty(editProperty, null);
      await createImageProperty(
        editProperty,
        selectedImage,
        propertyResponse.data.id
      );
      setLoading(false);
      navigate("/");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Berhasil Mengubah Properti!
            </span>
          </div>
        ),
        description:
          "Data Produk berhasil diperbarui, nih. Silahkan nikmati fitur lainnya!!",
      });
      setSelectedId(0);
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">Gagal Mengubah Property!</span>
          </div>
        ),
        description:
          "Oh, noo! Sepertinya ada kesalahan saat proses penyimpanan perubahan data, nih. Periksa koneksi mu dan coba lagi, yuk!!",
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
        onSubmit={handleSubmit(selectedId === 0 ? onSubmit : onSubmitEdit)}
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
            <label htmlFor="">Tanggal mulai sewa</label>
            <Input
              type="date"
              placeholder="Tahunan / Bulanan"
              className="w-max mb-3"
              name="rentalPeriodStart"
              register={register}
              error={errors.rentalPeriodStart?.message}
            />

            <label htmlFor="">Tanggal selesai sewa</label>
            <Input
              type="date"
              placeholder="Tahunan / Bulanan"
              className="w-max mb-3"
              name="rentalPeriodEnd"
              register={register}
              error={errors.rentalPeriodEnd?.message}
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
          placeholder="Nama Properti anda"
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
              placeholder=""
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
          <div>
            <p className="font-bold">Jumlah Lantai</p>
            <Input
              type="number"
              placeholder="1"
              className=""
              name="propertyFloor"
              register={register}
              error={errors.propertyFloor?.message}
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
            type="text"
            placeholder="Latitude"
            value={String(lat)}
            onChange={(e) => setLat(e.target.value)}
            register={register}
            name="latitudeProperty"
            error={errors.latitudeProperty?.message}
          />
          <Input
            type="text"
            placeholder="Longitude"
            value={String(lng)}
            onChange={(e) => setLng(e.target.value)}
            register={register}
            name="longitudeProperty"
            error={errors.longitudeProperty?.message}
          />
        </div>
        <div className="my-3">
          <p className="font-bold">Link Google Maps</p>
          <Input
            type="url"
            className="w-2/6 mb-10"
            name="gmaps_link"
            register={register}
            error={errors.gmaps_link?.message}
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
                name="image"
                id="inputImageProducts"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
                multiple
              />
            </label>
            {fileError && <div className="text-red-600 mb-3">{fileError}</div>}
            {previewImage.length > 0 && (
              <div className="ml-4 flex flex-wrap gap-4">
                {previewImage.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-60 h-60 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold">Tempelkan URL (Opsional)</p>
            <Input
              type="url"
              className="w-3/6"
              name="other_links"
              register={register}
              error={errors.other_links?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-evenly w-4/6 mt-5">
          <Link
            to="/"
            className="bg-white border-2 border-blue-secondary text-blue-secondary rounded-xl px-20 py-1 hover:shadow-2xl text-xl hover:scale-125 transition"
          >
            Batalkan
          </Link>
          {loading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              label={selectedId === 0 ? "Tambah Produk " : "Simpan Perubahan"}
              className="text-white bg-blue-secondary rounded-xl px-20 py-1 hover:shadow-2xl text-xl hover:scale-125 transition"
            />
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

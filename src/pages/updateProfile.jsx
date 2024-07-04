import Button from "@/components/button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { getProfile, updateProfile } from "@/utils/apis/profile/profile";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import { useToken } from "@/utils/context/tokenContext";
import React, { useEffect, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Loading } from "@/components/loading";

const schema = z.object({
  name: z.string().min(1, { message: "nama tidak boleh kosong" }),
  email: z
    .string()
    .min(1, { message: "email tidak boleh kosong" })
    .email({ message: "Isi dengan format email yang benar" }),
  phoneNumber: z.string().min(1, { message: "No.Hp tidak boleh kosong" }),
});

export default function UpdateProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { toast } = useToast();
  const { tokenLocal, saveTokenAndUser } = useToken();
  const navigate = useNavigate();

  const {
    reset,
    register,
    setValue,
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
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const result = await getProfile();
      setProfile(result.data);

      if (result.data) {
        setValue("name", result.data.name);
        setValue("email", result.data.email);
        setValue("phoneNumber", result.data.phone);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setLoading(false);
    }
  }

  async function onSubmitEdit(data) {
    try {
      const editProfile = {
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
      };
      await updateProfile(editProfile);

      // Update local storage with the new user name
      localStorage.setItem("user", JSON.stringify(data.name));
      saveTokenAndUser(tokenLocal, data.name);
      navigate("/");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Berhasil Mengubah Data!
            </span>
          </div>
        ),
      });
      setLoading(false);
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">gagal menyimpan data!</span>
          </div>
        ),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <form className=" my-10" onSubmit={handleSubmit(onSubmitEdit)}>
        <div className="flex items-center justify-center gap-10">
          <div>
            <p>Nama</p>
            <Input
              type="text"
              name="name"
              register={register}
              error={errors.name?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 my-5">
          <div>
            <p>Email</p>
            <Input
              type="email"
              name="email"
              register={register}
              error={errors.name?.message}
            />
          </div>
          <div>
            <p>No. Handphone</p>
            <Input
              type="text"
              name="phoneNumber"
              register={register}
              error={errors.name?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-center my-10">
          {loading ? (
            <Loading />
          ) : (
            <Button
              className="bg-blue-secondary text-white rounded-xl py-2 px-5"
              label="Simpan Perubahan"
            />
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

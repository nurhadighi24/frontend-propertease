import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import Button from "@/components/button";

import { FaRegCheckCircle, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/footer";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import registerAcc from "@/utils/apis/auth/register";
import { useToast } from "@/components/ui/use-toast";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Loading } from "@/components/loading";

const schema = z.object({
  nameRegister: z.string().min(1, { message: "Nama tidak boleh kosong!" }),
  emailRegister: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Isi dengan format email yang benar!" }),
  phoneNumberRegister: z
    .string()
    .min(1, { message: "NO.hp tidak boleh kosong!" }),
  passwordRegister: z
    .string()
    .min(1, { message: "Password tidak boleh kosong!" })
    .min(8, { message: "Password harus terdiri dari 8 karakter!" }),
  passwordConfirmationRegister: z
    .string()
    .min(1, { message: "Password tidak boleh kosong!" })
    .min(8, { message: "Password harus terdiri dari 8 karakter!" })
    .refine(
      (data) => data.passwordRegister === data.passwordConfirmationRegister,
      {
        message: "Konfirmasi password harus sama dengan password!",
        path: ["passwordConfirmationRegister"],
      }
    ),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowIcon(!showIcon);
  };

  async function onSubmit(data) {
    try {
      const newAcc = {
        name: data.nameRegister,
        email: data.emailRegister,
        phone: data.phoneNumberRegister,
        password: data.passwordRegister,
        password_confirmation: data.passwordConfirmationRegister,
      };
      setIsLoading(true);
      await registerAcc(newAcc);
      navigate("/login");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Berhasil Membuat akun!
            </span>
          </div>
        ),
      });
      reset();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">Gagal Membuat Akun!</span>
          </div>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Navbar />
      <div className="bg-white rounded-2xl shadow-2xl mx-5 my-20 flex flex-col items-center ">
        <div>
          <p className="text-center text-3xl font-bold pt-5">Daftar</p>
          <p>Daftarkan diri anda sekarang!</p>
        </div>
        <form className="w-2/6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nama"
            className="my-5"
            type="text"
            id="inputNameRegister"
            register={register}
            name="nameRegister"
            error={errors.nameRegister?.message}
          />
          <Input
            placeholder="Email"
            className="my-5"
            type="email"
            id="inputEmailRegister"
            register={register}
            name="emailRegister"
            error={errors.emailRegister?.message}
          />
          <Input
            placeholder="No.Hp"
            className="my-5"
            type="text"
            register={register}
            name="phoneNumberRegister"
            error={errors.phoneNumberRegister?.message}
          />
          <div className="relative">
            <Input
              placeholder="Password"
              className="my-5"
              type={showPassword ? "text" : "password"}
              register={register}
              name="passwordRegister"
              error={errors.passwordRegister?.message}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showIcon ? (
                <FaRegEyeSlash onClick={handleShowPassword} />
              ) : (
                <FaRegEye onClick={handleShowPassword} />
              )}
            </div>
          </div>
          <Input
            placeholder="Konfirmasi Password"
            className="my-5"
            type={showPassword ? "text" : "password"}
            register={register}
            name="passwordConfirmationRegister"
            error={errors.passwordConfirmationRegister?.message}
          />
          <div className="w-full flex justify-center my-5">
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                label="Buat Akun"
                className="text-white bg-blue-secondary w-80 py-2 text-center rounded-lg"
              />
            )}
          </div>
          <p className="w-full flex justify-center">
            Sudah punya akun?{" "}
            <Link className="font-bold" to="/login" type="submit">
              Masuk
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

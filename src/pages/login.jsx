import React, { useState } from "react";
import Button from "@/components/button";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";

import { FaRegCheckCircle, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/footer";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import loginAcc from "@/utils/apis/auth/login";
import { useToken } from "@/utils/context/tokenContext";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/loading";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Isi dengan format email yang benar" }),
  password: z
    .string()
    .min(1, { message: "Kata sandi harus diisi" })
    .min(6, { message: "Kata sandi harus terdiri dari 6 karakter" }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    saveTokenAndUser,
    saveTokenToSessionAndUser,
    tokenLocal,
    tokenSession,
  } = useToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowIcon(!showIcon);
  };

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const result = await loginAcc(data.email, data.password);
      const userName = result.data.user.name;
      saveTokenAndUser(result.data.access_token, userName);
      localStorage.setItem("accessToken", result.data.access_token);
      localStorage.setItem("user", JSON.stringify(userName));
      setIsLoading(false);
      navigate("/");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">Berhasil Login!</span>
          </div>
        ),
      });
    } catch (error) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">Gagal Masuk Akun!</span>
          </div>
        ),
        description: "Pastikan Email dan Password benar",
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
          <p className="text-center text-3xl font-bold py-5">
            Sudah pernah bergabung sebelumnya? Yuk Masuk
          </p>
        </div>
        <form className="w-2/6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Email"
            className="my-5"
            type="email"
            id="inputEmail"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <div className=" relative">
            <Input
              placeholder="Password"
              className=""
              type={showPassword ? "text" : "password"}
              id="inputPassword"
              register={register}
              name="password"
              error={errors.password?.message}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showIcon ? (
                <FaRegEyeSlash onClick={handleShowPassword} />
              ) : (
                <FaRegEye onClick={handleShowPassword} />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button label="Lupa Password?" className=" text-end" />
          </div>
          <div className="w-full flex justify-center my-5">
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                label="Masuk"
                className="text-white bg-blue-secondary w-80 py-2 text-center rounded-lg"
                type="submit"
              />
            )}
          </div>
        </form>

        <p className="my-5">
          Belum punya akun?{" "}
          <Link className="font-bold" to="/register">
            Daftar
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/loading";
import Button from "@/components/button";
import { Input } from "@/components/ui/input";
import { FaRegCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { postInputOtp } from "@/utils/apis/auth/resetPassword";

const schema = z.object({
  otp_code: z.string().min(1, { message: "harus diisi 6 karakter" }),
  password: z
    .string()
    .min(1, { message: "Kata sandi harus diisi" })
    .min(6, { message: "Kata sandi harus terdiri dari 6 karakter" }),
});

export default function InputOtp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp_code: "",
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const newAcc = {
        code: data.otp_code,
        password: data.password,
      };
      await postInputOtp(newAcc);
      //   console.log(result.data);
      setIsLoading(false);
      navigate("/login");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Berhasil mengubah password!
            </span>
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
            <span className="ml-2">Gagal Mengubah password!</span>
          </div>
        ),
        description: "Pastikan OTP dan password baru terisi dengan benar",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowIcon(!showIcon);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        {/* Wrapper container */}
        <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <p>OTP</p>
          <Input
            placeholder="OTP"
            className="my-5"
            type="text"
            id="inputEmail"
            name="otp_code"
            register={register}
            error={errors.otp_code?.message}
          />
          <div className=" relative my-5">
            <p>Password Baru</p>
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
          <div className="w-full flex justify-center my-5">
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                label="reset password"
                className="text-white bg-blue-secondary w-80 py-2 text-center rounded-lg"
                type="submit"
              />
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

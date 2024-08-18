import Button from "@/components/button";
import Footer from "@/components/footer";
import { Loading } from "@/components/loading";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FaRegCheckCircle } from "react-icons/fa";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { reqEmailOtp } from "@/utils/apis/auth/resetPassword";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Isi dengan format email yang benar" }),
});

export default function ReqEmailOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const newAcc = {
        email: data.email,
      };
      await reqEmailOtp(newAcc);
      //   console.log(result.data);
      setIsLoading(false);
      navigate("/inputotp");
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Kode OTP berhasil dikirim ke Email!
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
            <span className="ml-2">Gagal Mengirim kode OTP!</span>
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
            OTP AKAN DIKIRIM KE EMAIL
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

          <div className="w-full flex justify-center my-5">
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                label="kirim"
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

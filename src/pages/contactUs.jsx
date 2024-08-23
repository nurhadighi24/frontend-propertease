import Button from "@/components/button";
import Footer from "@/components/footer";
import { Loading } from "@/components/loading";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { contactUsUrl } from "@/utils/apis/contactUs/contactUs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCheckCircle } from "react-icons/fa";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "harus diisi" }),
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Isi dengan format email yang benar!" }),
  phone: z.string().min(1, { message: "harus diisi" }),
  message: z.string().min(1, { message: "harus diisi" }),
});

export default function ContactUs() {
  const [isLoading, setIsLoading] = useState(false);
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
      const newSimulate = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      };
      await contactUsUrl(newSimulate);
      setIsLoading(false);
      toast({
        title: (
          <div className="flex items-center gap-3">
            <FaRegCheckCircle className="text-[#05E500] text-3xl" />
            <span className=" text-base font-semibold">
              Pesan Sudah Terkirim
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
            <span className="ml-2">Gagal Mengirim Pesan!</span>
          </div>
        ),
        description: "",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-around items-center border rounded-2xl border-black bg-blue-primary m-5 gap-5">
        <div className="text-white">
          <h2 className="text-3xl font-bold">Hubungi Kami</h2>
          <p>
            Hubungi kami jika ada pertanyaan, saran, komentar, atau kendala
            apapun
          </p>
        </div>
        <div>
          <img src="/contactus-image.png" alt="" />
        </div>
      </div>

      <form
        className="border border-black w-96 p-5 rounded-2xl m-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-bold">
          Nama <span className="text-red-600">*</span>
        </p>
        <Input
          type="text"
          placeholder="Masukkan Nama"
          className="w-4/6 mb-3"
          id="inputName"
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <p className="font-bold">
          Email <span className="text-red-600">*</span>
        </p>
        <Input
          type="text"
          placeholder="Masukkan Email"
          className="w-4/6 mb-3"
          id="inputEmail"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <p className="font-bold">
          Nomor Telepon <span className="text-red-600">*</span>
        </p>
        <Input
          type="text"
          placeholder="Masukkan Nomor Telepon"
          className="w-4/6 mb-3"
          id="inputNoPhone"
          name="phone"
          register={register}
          error={errors.phone?.message}
        />
        <p className="font-bold">
          Pesan <span className="text-red-600">*</span>
        </p>
        <Textarea
          placeholder=""
          className="w-4/6 mb-10"
          name="message"
          register={register}
          error={errors.message?.message}
        />
        <div className="w-full flex justify-center my-5">
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              label="Submit"
              className="text-white bg-blue-secondary w-80 py-2 text-center rounded-lg"
              type="submit"
            />
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

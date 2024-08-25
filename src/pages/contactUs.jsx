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
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaClock, FaRegCheckCircle } from "react-icons/fa";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
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
      <div className="md:flex justify-around items-center border rounded-2xl border-black bg-blue-primary m-5 gap-5">
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

      <div className="md:flex justify-around">
        <form
          className="border border-black w-1/2 p-5 rounded-2xl m-5"
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
        <div className="border border-black w-1/2 rounded-2xl m-5 p-5">
          <p>Layanan Keluhan Pelanggan</p>
          <div className="flex items-center gap-3 my-3">
            <IoIosMail className="text-2xl text-blue-secondary" />
            <div>
              <p>Email</p>
              <p className="text-blue-secondary">propertease@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 my-3">
            <BsFillTelephoneFill className="text-2xl text-blue-secondary" />
            <div>
              <p>Nomor Telepon</p>
              <p>01234567890</p>
            </div>
          </div>
          <div className="flex items-center gap-3 my-3">
            <IoLogoWhatsapp className="text-2xl text-blue-secondary" />
            <div>
              <p>Whatsapp</p>
              <p>01234567890</p>
            </div>
          </div>
          <div className="flex gap-3 my-3">
            <FaClock className="text-2xl text-blue-secondary" />
            <div>
              <p>Jam Operasional</p>
              <p>Senin-Jumat (10:00 - 15:00 WIB)</p>
              <p>Sabtu (10:00 - 13:00 WIB)</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

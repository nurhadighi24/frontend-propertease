import Button from "@/components/button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoCloudUpload } from "react-icons/io5";

export default function UpdateProfile() {
  return (
    <>
      <Navbar />
      <form className=" my-10">
        <div className="flex flex-col items-center mb-6">
          <label className="w-max h-[12rem] flex flex-col items-center justify-center p-2 mb-2 text-blue tracking-wide   border-blue hover:bg-blue border-2 bg-white border-black rounded cursor-pointer">
            <div className="flex items-center p-10 gap-3">
              <p className=" text-gray-secondary">
                Klik di sini untuk Unggah foto
              </p>
            </div>

            <Input
              id="inputImageProducts"
              type="file"
              className="hidden"
              multiple
            />
          </label>
        </div>
        <div className="flex items-center justify-center gap-10">
          <div>
            <p>Nama Depan</p>
            <Input type="text" />
          </div>
          <div>
            <p>Nama Belakang</p>
            <Input type="text" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 my-5">
          <div>
            <p>Email</p>
            <Input type="email" />
          </div>
          <div>
            <p>No. Handphone</p>
            <Input type="text" />
          </div>
        </div>
        <div className="flex items-center justify-center my-10">
          <Button
            className="bg-blue-secondary text-white rounded-xl py-2 px-5"
            label="Simpan Perubahan"
          />
        </div>
      </form>
      <Footer />
    </>
  );
}

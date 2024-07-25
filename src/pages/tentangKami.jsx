import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

export default function TentangKami() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="bg-blue-primary w-full h-[20rem] flex flex-col justify-center items-center m-5 rounded-lg">
          <h2 className="text-white font-bold text-6xl">PropertEase</h2>
          <p className="text-white text-xl">
            Kemudahan dalam mencari properti impian anda
          </p>
        </div>
      </div>
      <p className="text-blue-primary text-2xl font-bold m-5">Tentang Kami</p>
      <p className="m-5 text-xl">
        <span className="text-2xl font-semibold">PropertEase </span>
        merupakan marketplace properti online yang menyediakan pengalaman
        berbelanja properti yang menyenangkan dan transparan. Kami bertujuan
        membantu Anda menemukan rumah atau investasi properti yang tepat. kami
        menawarkan beragam pilihan properti yang dapat disesuaikan dengan
        kebutuhan dan preferensi Anda. Kami percaya setiap langkah dalam
        perjalanan properti Anda harus memberikan kepastian, kenyamanan, dan
        kebahagiaan. Temukan properti impian Anda bersama PropertEase.
      </p>
      <Footer />
    </>
  );
}

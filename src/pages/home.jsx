import Navbar from "../components/navbar";
import Button from "../components/button";
import { Input } from "@/components/ui/input";
import CardHome from "@/components/cardHome";
import CardHomeWhy from "@/components/cardHomeWhy";
import CardHomeArticle from "@/components/cardHomeArticle";

function Home() {
  return (
    <>
      <Navbar />
      <div className=" bg-blue-primary mx-5 rounded-2xl ">
        <div>
          <div className="pt-5 text-center">
            <p className="text-white font-extrabold text-5xl">
              TEMUKAN PROPERTI
            </p>
            <p className="text-white font-extrabold text-5xl">
              YANG ANDA INGINKAN
            </p>
          </div>
          <div className="flex items-center justify-center gap-10 my-10">
            <Button
              label="Dijual"
              className="text-black bg-white px-6 py-2 rounded-xl"
            />
            <Button
              label="Disewakan"
              className="text-black bg-white px-6 py-2 rounded-xl"
            />
          </div>
          <div className="flex justify-center pb-5">
            <div className=" relative w-2/6 ">
              <Input
                type="text"
                placeholder="masukkan nama properti atau lokasi"
                className=" py-6"
              />
              <svg
                className="absolute right-3 top-4 text-primary-green"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2892 8.97102C11.7427 8.12671 12 7.16127 12 6.13574C12 2.82203 9.31371 0.135742 6 0.135742C2.68629 0.135742 0 2.82203 0 6.13574C0 9.44945 2.68629 12.1357 6 12.1357C7.56425 12.1357 8.98868 11.5371 10.0567 10.5565L12.2421 12.596C12.6458 12.9728 13.2786 12.9509 13.6554 12.5472C14.0322 12.1434 14.0104 11.5106 13.6066 11.1338L11.2892 8.97102ZM6 10.0357C3.84609 10.0357 2.1 8.28965 2.1 6.13574C2.1 3.98183 3.84609 2.23574 6 2.23574C8.15391 2.23574 9.9 3.98183 9.9 6.13574C9.9 8.28965 8.15391 10.0357 6 10.0357Z"
                  fill="#000000"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-slate-400 mx-5 mt-5">
        <div className="flex items-center gap-3 px-5 py-5">
          <p className="text-black text-xl">Properti Pilihan</p>
          <Button
            label="lihat beberapa Properti"
            className="bg-white border border-blue-secondary rounded-2xl px-3 py-1 text-blue-secondary"
          />
        </div>
        <div className="pl-5 pb-5 grid grid-cols-4">
          <CardHome
            src="src/assets/example-photo.jpeg"
            titles="Riverside Residence"
            location="Tangerang"
            unitWide="20-60 m2"
            bedroom="3"
            price="Rp500.000.000"
            alt="Property Picture"
          />
          <CardHome
            src="src/assets/example-photo.jpeg"
            titles="Riverside Residence"
            location="Tangerang"
            unitWide="20-60 m2"
            bedroom="3"
            price="Rp500.000.000"
            alt="Property Picture"
          />
          <CardHome
            src="src/assets/example-photo.jpeg"
            titles="Riverside Residence"
            location="Tangerang"
            unitWide="20-60 m2"
            bedroom="3"
            price="Rp500.000.000"
            alt="Property Picture"
          />
          <CardHome
            src="src/assets/example-photo.jpeg"
            titles="Riverside Residence"
            location="Tangerang"
            unitWide="20-60 m2"
            bedroom="3"
            price="Rp500.000.000"
            alt="Property Picture"
          />
        </div>
      </div>
      <div>
        <p className="text-xl mx-5 my-5">Simulasi KPR</p>
      </div>
      <p className="text-2xl my-5 mx-5">Kenapa PropertEase?</p>
      <div className="grid grid-cols-4">
        <CardHomeWhy
          titlesLabel="Aman & Mudah"
          descLabel="Jual Properti Anda dengan aman dan mudah"
        />
        <CardHomeWhy
          titlesLabel="Cepat & Terpercayas"
          descLabel="Jual Properti Anda dengan Cepat dan Terpercaya"
        />
        <CardHomeWhy
          titlesLabel="Kulitas Mitra Terbaik"
          descLabel="Kualitas Mitra yang Baik"
        />
        <CardHomeWhy
          titlesLabel="Simulasi KPR"
          descLabel="Perhitungan yang lebih mudah dengan simulasi KPR"
        />
      </div>
      <p className="mx-5 my-5 text-2xl">Artikel PropertEase</p>
      <div className="grid grid-cols-4 mx-5 my-5">
        <CardHomeArticle
          src="src/assets/example-photo.jpeg"
          titlesArticle="Apa Itu KPR? Ini Keunggulannya Sebelum Miliki Rumah Sendiri"
          descArticle="berikut merupakan keunggulannya..."
        />
        <CardHomeArticle
          src="src/assets/example-photo.jpeg"
          titlesArticle="Apa Itu KPR? Ini Keunggulannya Sebelum Miliki Rumah Sendiri"
          descArticle="berikut merupakan keunggulannya..."
        />
        <CardHomeArticle
          src="src/assets/example-photo.jpeg"
          titlesArticle="Apa Itu KPR? Ini Keunggulannya Sebelum Miliki Rumah Sendiri"
          descArticle="berikut merupakan keunggulannya..."
        />
        <CardHomeArticle
          src="src/assets/example-photo.jpeg"
          titlesArticle="Apa Itu KPR? Ini Keunggulannya Sebelum Miliki Rumah Sendiri"
          descArticle="berikut merupakan keunggulannya..."
        />
      </div>
    </>
  );
}

export default Home;

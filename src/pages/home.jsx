import Navbar from "../components/navbar";
import Button from "../components/button";
import { Input } from "@/components/ui/input";
import CardHome from "@/components/cardHome";
import CardHomeWhy from "@/components/cardHomeWhy";
import CardHomeArticle from "@/components/cardHomeArticle";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { getArticle } from "@/utils/apis/artikel/artikel";
import { Loading } from "@/components/loading";
import { getProperties } from "@/utils/apis/property/properties";
import formatCurrency from "@/utils/currencyIdr";
import slugify from "slugify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { simulateKpr } from "@/utils/apis/KPR/simulateKRP";

import ReactGA from "react-ga4";

const schema = z.object({
  propertyPrice: z.string().min(1, { message: "Harga properti harus diisi" }),
  downPayment: z.string().min(1, { message: "Uang muka harus diisi" }),
  interestRate: z.string().min(1, { message: "Suka bunga harus diisi" }),
  timePeriod: z.string().min(1, { message: "Jangka Waktu harus diisi" }),
});

function Home() {
  const [article, setArticle] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulatedKpr, setSimulatedKpr] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function generateSlug(name) {
    return slugify(name, { lower: true });
  }

  const toDetailProperties = (propertiesId, slug) => {
    navigate(`/detail-properti/${propertiesId}/${slug}`);
  };

  const toDetailArticle = (articlesId, slug) => {
    navigate(`/detail-artikel/${articlesId}/${slug}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function onSubmit(data) {
    try {
      const newSimulate = {
        harga_properti: data.propertyPrice,
        uang_muka: data.downPayment,
        suku_bunga: data.interestRate,
        jangka_waktu: data.timePeriod,
      };
      const result = await simulateKpr(newSimulate);
      setSimulatedKpr(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      const resultProperties = await getProperties();
      const resultArticle = await getArticle();
      setProperties(resultProperties.data);
      setArticle(resultArticle.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/properti-pilihan?search=${searchQuery}`);
  };

  function truncateDescription(description, wordLimit) {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  }

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
            <Link
              to="/properti-dijual"
              className="text-black bg-white px-6 py-2 rounded-xl"
            >
              Dijual
            </Link>
            <Link
              to="/properti-disewakan"
              className="text-black bg-white px-6 py-2 rounded-xl"
            >
              Disewa
            </Link>
          </div>
          <div className="flex justify-center pb-5">
            <form
              onSubmit={handleSearchSubmit}
              className=" relative w-full max-w-lg px-3 md:px-3 "
            >
              <Input
                type="text"
                placeholder="masukkan nama properti atau lokasi"
                className=" py-6"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="absolute right-5 top-1/2 transform -translate-y-1/2"
              >
                <svg
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
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className=" bg-blue-secondary mx-5 my-5">
        <div className="flex items-center gap-3 px-5 py-5">
          <p className="text-white text-xl">Properti Pilihan</p>
          <Link
            to="/properti-pilihan"
            className="bg-white border border-blue-secondary hover:border-white hover:text-white hover:bg-blue-secondary rounded-2xl px-3 py-1 text-blue-secondary"
          >
            Lihat Beberapa Properti
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Swiper
              navigation={true}
              // Set default slidesPerView

              breakpoints={{
                // when window width is >= 768px (laptop)
                768: {
                  slidesPerView: 1,
                },
                // when window width is >= 1024px (desktop)
                1024: {
                  slidesPerView: 2,
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Pagination, Navigation]}
            >
              {properties.map((item, index) => (
                <SwiperSlide key={index}>
                  <CardHome
                    src={
                      item.image_properties[0]?.image
                        ? `https://skkm.online/storage/${item.image_properties[0].image}`
                        : "path/to/default/image.jpg"
                    }
                    titles={item.name}
                    location={item.address}
                    bedroom={item.bedrooms}
                    buildingArea={item.building_area}
                    landArea={item.land_area}
                    price={formatCurrency(item.price)}
                    onClick={() => {
                      // Tambahkan interaksi ke Google Analytics
                      ReactGA.event({
                        category: "Property",
                        action: "Click Detail",
                        label: item.name,
                        nonInteraction: true,
                      });

                      // Navigasi ke halaman detail properti
                      toDetailProperties(item.id, generateSlug(item.name));
                    }}
                    alt={item.name}
                  ></CardHome>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center mx-5 my-5">
          <div className="flex-grow border-t-4 border-gray-300"></div>
          <p className="text-3xl mx-5 text-center font-bold">Simulasi KPR</p>
          <div className="flex-grow border-t-4 border-gray-300"></div>
        </div>
        <div className="md:flex md:justify-between  gap-5 mx-5">
          <div className="w-3/6">
            <p className="text-justify md:text-xl font-semibold">
              Simulasi KPR (Kredit Pemilikan Rumah) adalah alat yang membantu
              calon pembeli rumah menghitung angsuran dan biaya pinjaman KPR.
              Dengan memasukkan jumlah pinjaman, tenor, suku bunga, dan uang
              muka, calon pembeli dapat memperkirakan angsuran bulanan serta
              biaya total pinjaman. Simulasi ini memudahkan perencanaan
              keuangan, sehingga calon pembeli dapat memilih opsi yang paling
              sesuai dengan kemampuan finansial mereka.
            </p>
            <div className="flex items-center gap-5">
              <div>
                <div className="flex items-center gap-2">
                  <img src="/logo-bca.png" alt="" className="w-20" />
                  <p>KPR Bank BCA 2.79% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo-dki.png" alt="" className="w-20" />
                  <p>KPR Bank DKI 4.56% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo-bni.png" alt="" className="w-20" />
                  <p>KPR Bank BNI 2.75% 1 Tahun</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src="/logo-permata.png" alt="" className="w-20" />
                  <p>KPR Bank Permata 9.75% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2 my-5">
                  <img src="/logo-bri.png" alt="" className="w-20" />
                  <p>KPR Bank BRI 3.25% 1 Tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo-mandiri.png" alt="" className="w-20" />
                  <p>KPR Bank Mandiri 14.25% 1 Tahun</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/6">
            <Input
              className="mb-5"
              placeholder="Harga Properti"
              type="text"
              name="propertyPrice"
              register={register}
              error={errors.propertyPrice?.message}
            />
            <p>{formatCurrency(watch("propertyPrice"))}</p>
            <Input
              className="my-5"
              placeholder="Uang Muka"
              type="text"
              name="downPayment"
              register={register}
              error={errors.downPayment?.message}
            />
            <p>{formatCurrency(watch("downPayment"))}</p>
            <Input
              className="my-5"
              placeholder="Suku Bunga (%)"
              type="text"
              name="interestRate"
              register={register}
              error={errors.interestRate?.message}
            />
            <Input
              className="my-5"
              placeholder="Jangka Waktu (Tahun)"
              type="text"
              name="timePeriod"
              register={register}
              error={errors.timePeriod?.message}
            />
            <Button
              label="SIMULASIKAN"
              className="text-white bg-blue-secondary w-80 my-5 py-2 text-center rounded-lg"
            />
            {simulatedKpr && (
              <div className=" w-fit my-5 bg-slate-600 rounded p-5 text-white">
                <p className="text-xl mb-3">Hasil Simulasi KPR</p>
                <p className="mb-3">
                  Angsuran Bulanan: {simulatedKpr.angsuran_bulanan}
                </p>
                <p className="mb-3">
                  Jumlah Pinjaman: {simulatedKpr.jumlah_pinjaman}
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="flex items-center mx-5 my-5">
        <div className="flex-grow border-t-4 border-gray-300"></div>
        <p className="text-3xl mx-5 text-center font-bold">
          Kenapa PropertEase?
        </p>
        <div className="flex-grow border-t-4 border-gray-300"></div>
      </div>
      <div className=" md:flex md:justify-around grid grid-cols-2 max-sm:grid-cols-1 ">
        <CardHomeWhy
          titlesLabel="Aman & Mudah"
          descLabel="Jual Properti Anda dengan aman dan mudah"
        />
        <CardHomeWhy
          titlesLabel="Cepat & Terpercaya"
          descLabel="Jual Properti Anda dengan Cepat dan Terpercaya"
        />
        <CardHomeWhy
          titlesLabel="Kualitas Mitra Terbaik"
          descLabel="Kualitas Mitra yang Baik"
        />
        <CardHomeWhy
          titlesLabel="Simulasi KPR"
          descLabel="Perhitungan yang lebih mudah dengan simulasi KPR"
        />
      </div>
      <div className="flex items-center mx-5 my-5">
        <div className="flex-grow border-t-4 border-gray-300"></div>
        <p className="text-3xl mx-5 text-center font-bold">
          Artikel PropertEase
        </p>
        <div className="flex-grow border-t-4 border-gray-300"></div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Swiper
            breakpoints={{
              // when window width is >= 768px (laptop)
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 1024px (desktop)
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
          >
            {article.map((item, index) => (
              <SwiperSlide key={index}>
                <CardHomeArticle
                  src={`https://skkm.online/storage/${item.image}`}
                  titlesArticle={item.title}
                  descArticle={truncateDescription(item.description, 10)}
                  alt="Article Image"
                  onClick={() =>
                    toDetailArticle(item.id, generateSlug(item.title))
                  }
                ></CardHomeArticle>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      <Footer />
    </>
  );
}

export default Home;

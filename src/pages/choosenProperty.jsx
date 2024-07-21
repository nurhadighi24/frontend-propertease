import CardChoosen from "@/components/cardChoosen";
import Footer from "@/components/footer";
import { Loading } from "@/components/loading";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import {
  getProperties,
  getPropertyShowUser,
} from "@/utils/apis/property/properties";
import formatCurrency from "@/utils/currencyIdr";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function ChoosenProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function generateSlug(name) {
    return slugify(name, { lower: true });
  }

  const toDetailProperties = (propertiesId, slug) => {
    navigate(`/detail-properti/${propertiesId}/${slug}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const resultProperties = await getPropertyShowUser();
      setProperties(resultProperties.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex ml-10 py-5">
        <div className=" relative w-2/6 ">
          <Input
            type="text"
            placeholder="masukkan nama properti atau lokasi"
            className=" py-6"
          />
          <svg
            className="absolute right-3 top-4 "
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
      {loading ? (
        <Loading />
      ) : (
        <>
          {properties.map((item, index) => (
            <CardChoosen
              key={index}
              src={`https://skkm.online/storage/${item.image}`}
              titlesChoosen={item.name}
              addressChoosen={item.address}
              provinceChoosen={item.province}
              cityChoosen={item.city}
              districtChoosen={item.district}
              descChoosen={item.description}
              priceChoosen={formatCurrency(item.price)}
              onClick={() =>
                toDetailProperties(item.id, generateSlug(item.name))
              }
              phone={item.user.phone}
              name={item.user.name}
            />
          ))}
        </>
      )}
      <Footer />
    </>
  );
}

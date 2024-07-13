import Navbar from "@/components/navbar";

import { FaLocationDot } from "react-icons/fa6";

import { BsFillPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@/components/button";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { getPropertyIklanSaya } from "@/utils/apis/property/propertyIklanSaya";
import { useToken } from "@/utils/context/tokenContext";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import CardIklanSaya from "@/components/cardIklanSaya";
import formatCurrency from "@/utils/currencyIdr";
import { Loading } from "@/components/loading";

export default function IklanSaya() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tokenLocal } = useToken();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const result = await getPropertyIklanSaya();
      console.log(result.data);
      setProperties(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          {properties.map((property) => (
            <CardIklanSaya
              key={property.id}
              src={`https://skkm.online/storage/${property.image}`}
              alt={property.name}
              titles={property.name}
              location={property.address}
              description={property.description}
              price={formatCurrency(property.price)}
            />
          ))}
        </>
      )}
      <Footer />
    </>
  );
}

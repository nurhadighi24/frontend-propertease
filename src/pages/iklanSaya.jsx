import Navbar from "@/components/navbar";

import { FaLocationDot } from "react-icons/fa6";

import { BsFillPencilFill } from "react-icons/bs";
import { FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/button";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import {
  deleteProperty,
  getPropertyIklanSaya,
} from "@/utils/apis/property/propertyIklanSaya";
import { useToken } from "@/utils/context/tokenContext";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import CardIklanSaya from "@/components/cardIklanSaya";
import formatCurrency from "@/utils/currencyIdr";
import { Loading } from "@/components/loading";
import Delete from "@/components/delete";
import { useToast } from "@/components/ui/use-toast";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export default function IklanSaya() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tokenLocal } = useToken();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toEditProperty = (id) => {
    navigate(`/pasang-iklan/${id}/edit-property`);
  };

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

  async function handleDeleteClick(id) {
    try {
      const result = await Delete({
        title: "Apakah anda yakin ingin menghapus properti ini?",
        text: "Properti yang sudah di hapus tidak bisa di pulihkan lagi!",
      });

      if (result.isConfirmed) {
        await deleteProperty(id);
        setLoading(false);
        toast({
          title: (
            <div className="flex items-center">
              <FaRegCheckCircle />
              <span className="ml-2">Properti berhasil dihapus!</span>
            </div>
          ),
          description:
            "Data produk telah berhasil dihapus, nih. Silahkan nikmati fitur lainnya!",
        });
        fetchData();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <CrossCircledIcon />
            <span className="ml-2">Gagal Menghapus Properti!</span>
          </div>
        ),
        description: "Terjadi kesalahan saat menghapus properti.",
      });
    } finally {
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
              onClickDelete={() => handleDeleteClick(property.id)}
              onClickEdit={() => toEditProperty(property.id)}
            />
          ))}
        </>
      )}
      <Footer />
    </>
  );
}

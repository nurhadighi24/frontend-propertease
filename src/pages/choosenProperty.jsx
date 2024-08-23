import CardChoosen from "@/components/cardChoosen";
import Footer from "@/components/footer";
import { Loading } from "@/components/loading";
import Navbar from "@/components/navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  getProperties,
  getPropertyShowUser,
} from "@/utils/apis/property/properties";
import formatCurrency from "@/utils/currencyIdr";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function ChoosenProperty() {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search");
  const initialPropertyType = searchParams.get("propertyType");
  const initialPriceFilter = searchParams.get("price");

  function generateSlug(name) {
    return slugify(name, { lower: true });
  }

  const toDetailProperties = (propertiesId, slug) => {
    navigate(`/detail-properti/${propertiesId}/${slug}`);
  };

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
    if (initialPropertyType) {
      setSelectedPropertyType(initialPropertyType);
    }
    if (initialPriceFilter) {
      setSelectedPriceFilter(initialPriceFilter);
    }
    fetchData();
  }, [initialSearchQuery, initialPropertyType, initialPriceFilter]);

  async function fetchData() {
    try {
      const resultProperties = await getPropertyShowUser();
      let filteredProperties = resultProperties.data;

      if (searchQuery) {
        filteredProperties = filteredProperties.filter(
          (property) =>
            property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.address
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            property.province
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.district.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedPropertyType) {
        filteredProperties = filteredProperties.filter(
          (property) => property.property_type === selectedPropertyType
        );
      }

      if (selectedPriceFilter) {
        filteredProperties = filteredProperties.filter((property) =>
          selectedPriceFilter === "below-500"
            ? property.price < 500000000
            : property.price >= 500000000
        );
      }

      setProperties(filteredProperties);
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

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyType(type);
    const params = new URLSearchParams(location.search);
    if (type) {
      params.set("propertyType", type);
    } else {
      params.delete("propertyType");
    }
    navigate({ search: params.toString() });
  };

  const handlePriceFilterChange = (filter) => {
    setSelectedPriceFilter(filter);
    const params = new URLSearchParams(location.search);
    if (filter) {
      params.set("price", filter);
    } else {
      params.delete("price");
    }
    navigate({ search: params.toString() });
  };

  // Extract unique offer types from properties
  const propertyTypes = [
    ...new Set(properties.map((property) => property.property_type)),
  ];

  return (
    <>
      <Navbar />

      <div className="flex justify-between mx-10 py-5">
        <form onSubmit={handleSearchSubmit} className="relative w-2/6">
          <Input
            type="text"
            placeholder="masukkan nama properti atau lokasi"
            className="py-6"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute right-3 top-4">
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
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center rounded-md bg-white py-3 px-3 border border-blue-primary gap-20">
              {selectedPropertyType || "Pilih Tipe Properti"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M5 4L0.669872 0.25L9.33013 0.25L5 4Z" fill="#28303F" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handlePropertyTypeChange("")}>
                Semua Tipe Penawaran
              </DropdownMenuItem>
              {propertyTypes.map((type, index) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handlePropertyTypeChange(type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center rounded-md bg-white py-3 px-3 border border-blue-primary gap-20">
              {selectedPriceFilter === "below-500"
                ? "Di Bawah 500 Juta"
                : selectedPriceFilter === "above-500"
                ? "Di Atas 500 Juta"
                : "Filter Harga"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M5 4L0.669872 0.25L9.33013 0.25L5 4Z" fill="#28303F" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handlePriceFilterChange("")}>
                Semua Harga
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceFilterChange("below-500")}
              >
                Di Bawah 500 Juta
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceFilterChange("above-500")}
              >
                Di Atas 500 Juta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : properties.length === 0 ? (
        <div className="flex justify-center py-10">
          <p className="font-bold text-xl">Maaf, Properti tidak tersedia</p>
        </div>
      ) : (
        <>
          {properties.map((item, index) => (
            <CardChoosen
              key={index}
              src={
                item.image_properties[0]?.image
                  ? `https://skkm.online/storage/${item.image_properties[0].image}`
                  : "path/to/default/image.jpg"
              }
              alt={item.name}
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
              propertyType={item.property_type}
            />
          ))}
        </>
      )}
      <Footer />
    </>
  );
}

import Button from "@/components/button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { getProfile } from "@/utils/apis/profile/profile";
import { setAxiosConfig } from "@/utils/axiosWithConfig";
import { useToken } from "@/utils/context/tokenContext";
import React, { useEffect, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";

export default function UpdateProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { tokenLocal } = useToken();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setAxiosConfig(tokenLocal, "https://skkm.online");
      const data = await getProfile();
      setProfile({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <form className=" my-10">
        <div className="flex items-center justify-center gap-10">
          <div>
            <p>Nama</p>
            <Input type="text" value={profile.name} readOnly />
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 my-5">
          <div>
            <p>Email</p>
            <Input type="email" value={profile.email} readOnly />
          </div>
          <div>
            <p>No. Handphone</p>
            <Input type="text" value={profile.phone} readOnly />
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

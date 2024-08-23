import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getDetailArticle } from "@/utils/apis/artikel/artikel";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailArticle() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id, slug } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailArticle(id, slug);
      setArticle(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <strong className="m-5 text-2xl">Artikel</strong>
      <div className="m-10">
        <img
          className="rounded-xl"
          src={`https://skkm.online/storage/${article.image}`}
          alt={article.title}
        />
        <p className="font-bold text-3xl my-5">{article.title}</p>
        <p style={{ whiteSpace: "pre-wrap" }}>{article.description}</p>
      </div>
      <Footer />
    </>
  );
}

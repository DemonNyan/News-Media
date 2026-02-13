// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../api/axios";

const Detail = () => {
  let { id } = useParams();
  let [news, setNews] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosApi("/api/news/" + id);

      //   console.log(res.data);
      setNews(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      {news && (
        <div className="px-11 mt-20">
          <h1 className="text-5xl font-semibold mb-10">Title:{news.title}</h1>
          <p className="text-2xl mb-10">Description: {news.description}</p>
          <h3 className="text-lg">Author: {news.author}</h3>
          <span className="">Types: {news.type}</span>
        </div>
      )}
    </>
  );
};

export default Detail;

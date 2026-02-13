import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Pagenation from "../components/Pagenation";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
// import axios from "axios";

export default function Home() {
  let [newsData, setNewsData] = useState([]);
  let [dataLink, setDataLink] = useState();
  let [Loading, setLoading] = useState(true);

  let Location = useLocation();
  let search = new URLSearchParams(Location.search);
  let page = search.get("page");
  page = parseInt(page) ? parseInt(page) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("/api/news?page=" + page);
        setLoading(false);

        if (response.status == 200) {
          let data = await response.data;
          setDataLink(data.datalink);
          // console.log(data.data);
          setNewsData(data.data);
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  let deletedNews = (_id) => {
    if (newsData.length == 1 && page > 1) {
      navigation.navigate("/?page=" + (page - 1));
    } else {
      setNewsData((prev) => prev.filter((remove) => remove._id !== _id));
    }
  };

  console.log(newsData.length);

  return (
    <div className="container  mx-auto px-4 py-8">
      {Loading && (
        <div className="flex justify-center  w-full ">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData &&
          newsData.map((news) => (
            <PostCard
              key={news._id}
              _id={news._id}
              title={news.title}
              description={news.description}
              author={news.author}
              date={news.createdAt}
              types={news.type}
              deletedNews={deletedNews}
            />
          ))}
      </div>
      {!!dataLink && newsData.length !== 0 && (
        <Pagenation links={dataLink} page={page || 1} />
      )}

      {!Loading && !!newsData.length == 0 && (
        <h3 className="text-green-500 text-center text-5xl font-semibold">
          There is no data
        </h3>
      )}
    </div>
  );
}

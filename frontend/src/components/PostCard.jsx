import React from "react";
import dayjs from "dayjs";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function PostCard({
  _id,
  title,
  description,
  author,
  date,
  types,
  deletedNews,
}) {
  let deleteNews = async () => {
    let res = await axios.delete("/api/news/" + _id);
    if (res.status == 200) {
      deletedNews(_id);
    }
  };
  return (
    <>
      <div
        onClick={() => {
          navigation.navigate("/detailNews/" + _id);
        }}
        className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
      >
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
          <p className="text-gray-600 text-sm mb-4 flex-1">
            Types:[{types.join(" , ")}]
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                {author ? author[0] : "N"}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {author}
                </div>
                <div className="text-xs text-gray-400">
                  {date && dayjs(date).format("MMM DD, YYYY")}
                </div>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
            >
              Read More
            </a>
          </div>
          <div className="flex items-center space-x-3 justify-between mt-4">
            <Link
              onClick={(e) => {
                e.stopPropagation();
                deleteNews();
              }}
              className="w-full text-center px-4 py-2 bg-red-600 text-white shadow-sm text-sm rounded-md hover:bg-red-700 transition"
            >
              Delete
            </Link>
            <Link
              to={"/updateNews/" + _id}
              onClick={(e) => e.stopPropagation()}
              className=" w-full text-center items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;

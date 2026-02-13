import React, { useState } from "react";
// import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosApi from "../api/axios";

function CreateNews() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [author, setAuthor] = useState("");
  let [type, setType] = useState("");
  let [errors, setErrors] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    let fetchData = async () => {
      if (id) {
        let news = await axiosApi("/api/news/" + id);

        if (news.status == 200) {
          // console.log(news.data.title);
          setTitle(news.data.title);
          setDescription(news.data.description);
          setAuthor(news.data.author);
          setType(news.data.type);
        }
      }
    };
    fetchData();
  }, [id]);

  const submitNews = async (e) => {
    try {
      e.preventDefault();

      let news = { title, description, author, type };
      let res;

      if (id) {
        res = await axiosApi.post("/api/news/" + id, news);
      } else {
        res = await axiosApi.post("/api/news/", news);
      }

      if (res.status == 200) {
        navigation.navigate("/");
      }
    } catch (error) {
      setErrors(Object.keys(error.response.data.errors));
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="font-2xl font-semibold text-center mb-3">
          {id ? "Edit News" : "Create News"}
        </h2>
        <ul className="list-disc pl-4">
          {!!errors.length &&
            errors.map((error, index) => (
              <li className="text-red-600 text-sm mb-2" key={index}>
                {error} field is required!
              </li>
            ))}
        </ul>
        <form action="" onSubmit={submitNews}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            id="title"
            placeholder="Enter News Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            rows="5"
            id="description"
            placeholder="Enter news description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            id="author"
            placeholder="Enter news author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="type">Type</label>
          <div className="flex space-x-2 items-center ">
            <input
              type="text"
              className="w-full mt-2 border border-gray-300 p-2 rounded-md mb-4"
              id="author"
              placeholder="Enter news type..."
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className=" bg-green-600 py-2 px-4 w-full mt-5 text-white rounded-md hover:bg-green-700 transition"
          >
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNews;

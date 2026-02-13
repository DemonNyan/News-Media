import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useState } from "react";
import axiosApi from "../api/axios";

const SignUp = () => {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [errors, setErrors] = useState("");
  let navigate = useNavigate();

  const register = async (e) => {
    try {
      e.preventDefault();
      let data = { name, email, password };
      let res = await axiosApi.post("/api/users/register", data, {
        withCredentials: true,
      });

      if (res.status == 200) {
        navigate("/");
      }
    } catch (errors) {
      // console.log(error.response.data.errors);
      setErrors(errors.response.data.errors);
    }
  };

  return (
    <>
      {" "}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            // method="POST"
            className="space-y-6 shadow-md rounded p-8  "
            onSubmit={(e) => {
              register(e);
            }}
          >
            <h1 className="text-black text-3xl text-center font-semibold mb-6">
              Register
            </h1>

            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-black"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  autoComplete="name"
                  className="w-full shadow border border-green-600 rounded p-3 text-green-600 focus:outline-none px-3 py-2 appearance-none"
                  placeholder="Mg Mg"
                />
                {!!(errors && errors.name) && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name.msg}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  autoComplete="email"
                  className="w-full shadow border border-green-600 rounded p-3 text-green-600 focus:outline-none px-3 py-2 appearance-none"
                  placeholder="sample@gmail.com"
                />
                {!!(errors && errors.email) && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.msg}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="current-password"
                  className="w-full shadow border border-green-600 rounded p-3 text-green-600 focus:outline-none px-3 py-2 appearance-none"
                  placeholder="xxxxxxxx"
                />
                {!!(errors && errors.password) && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.password.msg}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                // type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            You can
            <Link
              to="/signIn"
              className="ms-1 font-semibold text-green-400 hover:text-green-300"
            >
              Login Here !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

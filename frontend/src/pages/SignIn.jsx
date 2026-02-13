// import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosApi from "../api/axios";

const SignIn = () => {
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [errors, setErrors] = useState("");
  let navigate = useNavigate();

  let { user, dispatch } = useContext(UserContext);

  const login = async (e) => {
    try {
      e.preventDefault();
      let data = { email, password };
      let res = await axiosApi.post("/api/users/login", data, {
        withCredentials: true,
      });

      if (res.status == 200) {
        dispatch({ type: "LOGIN", payload: res.data.user });
        navigate("/");
      }
    } catch (errors) {
      // console.log(errors.response);
      setErrors(errors.response.data.errors);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            // action="#"
            // method="POST"
            className="space-y-6 shadow-md rounded p-8  "
            onSubmit={(e) => {
              login(e);
            }}
          >
            {!!errors && <p className="mt-1 text-red-500 text-sm">{errors}</p>}
            <h1 className="text-black text-3xl text-center font-semibold mb-6">
              Login
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full shadow border border-green-600 rounded p-3 text-green-600 focus:outline-none px-3 py-2 appearance-none"
                  placeholder="sample@gmail.com"
                />
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-green-800 hover:text-green-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full shadow border border-green-600 rounded p-3 text-green-600 focus:outline-none px-3 py-2 appearance-none"
                  placeholder="xxxxxxxx"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <Link
              to="/signUp"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;

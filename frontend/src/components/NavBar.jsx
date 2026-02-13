import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../api/axios";
import { UserContext } from "../context/UserContext";

function NavBar() {
  let { user, dispatch } = useContext(UserContext);
  let navigate = useNavigate();
  //   console.log(name);
  let logout = async () => {
    let res = await axiosApi.post("/api/users/logout");
    if (res.status == 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/signIn");
    }
  };
  return (
    <div>
      <nav className="bg-green-800 ">
        <div className=" flex justify-between items-center py-4 px-6 sm:px-8 lg:px-10">
          <div className="text-white text-lg sm:text-2xl font-semibold px-5">
            <Link to="/" className="text-yellow-50">
              Echo | Media News
            </Link>
          </div>
          <div className=" space-x-2  sm:space-x-6 sm:text-lg text-sm font-medium">
            {user && (
              <>
                <Link to="/" className="text-white hover:text-yellow-50">
                  Home
                </Link>

                <Link
                  to="/createNews"
                  className="text-white hover:text-yellow-50"
                >
                  Create
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/signIn" className="text-white hover:text-yellow-50">
                  Login
                </Link>
                <Link to="/signUp" className="text-white hover:text-yellow-50">
                  Register
                </Link>
              </>
            )}

            {!!user && (
              <button
                className="text-white hover:text-yellow-50"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

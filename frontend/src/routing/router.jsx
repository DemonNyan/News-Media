import { useContext } from "react";
// import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home.jsx";
// import About from "../pages/About.jsx";

import CreateNews from "../pages/CreateNews.jsx";
import Detail from "../pages/Detail.jsx";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import { UserContext } from "../context/UserContext.jsx";

function router() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { user } = useContext(UserContext);
  //   console.log(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={"/signIn"} />,
        },

        {
          path: "/createNews",
          element: user ? <CreateNews /> : <Navigate to={"/signIn"} />,
        },
        {
          path: "/updateNews/:id",
          element: <CreateNews />,
        },
        {
          path: "/detailNews/:id",
          element: <Detail />,
        },
        {
          path: "/signIn",
          element: !user ? <SignIn /> : <Navigate to={"/"} />,
        },
        {
          path: "/signUp",
          element: !user ? <SignUp /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default router;

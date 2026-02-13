import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <NavBar />
      <div className=" p-5 h-full bg-gray-100">
        <Outlet />
      </div>
    </>
  );
}

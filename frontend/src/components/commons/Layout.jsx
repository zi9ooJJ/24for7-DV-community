import { Outlet } from "react-router-dom";
import NavigationBar from "./Navbar";

function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Layout;

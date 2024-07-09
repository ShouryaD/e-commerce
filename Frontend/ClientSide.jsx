import React from "react";
import ClientNavbar from "./src/components/client/ClientNavbar";
import { Outlet } from "react-router-dom";
import UserContextProvider2 from "./src/context/UserContextProvider2";

export default function ClientSide() {
  return (
    <UserContextProvider2>
      <ClientNavbar />
      <Outlet />
    </UserContextProvider2>
  );
}

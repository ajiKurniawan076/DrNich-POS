/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../assets/component/navbar";

function dasboard() {
  return (
    <>
      <main className="flex flex-col h-screen container bg-[#EFEFEF] ">
        <Navbar selected={"/"} />
      </main>
    </>
  );
}

export default dasboard;

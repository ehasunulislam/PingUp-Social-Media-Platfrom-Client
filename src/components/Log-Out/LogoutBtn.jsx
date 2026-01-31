"use client"
import useAuthInfo from "@/Hooks/useAuthInfo";
import React from "react";
import Swal from "sweetalert2";

const LogoutBtn = () => {

 const {logOutFunctionality} = useAuthInfo();

  const handleLogOut = () => {
    logOutFunctionality()
      .then(() => Swal.fire({ title: "Logged out", icon: "success" }))
      .catch((err) => Swal.fire({ icon: "error", title: err.message }));
  };

  return (
    <div className="mt-3">
      <button className="btn w-48" onClick={handleLogOut}>
        <p>logout</p>
      </button>
    </div>
  );
};

export default LogoutBtn;

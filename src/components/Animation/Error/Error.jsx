"use client";
import Lottie from "lottie-react";
import React from "react";
import error from "./error.json"

const Error = () => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie animationData={error} loop={true} />
    </div>
  );
};

export default Error;

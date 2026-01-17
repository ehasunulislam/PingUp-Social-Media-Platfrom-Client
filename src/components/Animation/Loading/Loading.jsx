"use client";

import Lottie from "lottie-react";
import React from "react";
import pageLoading from "./pageLoading.json"

const Loading = () => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie animationData={pageLoading} loop={true} />
    </div>
  );
};

export default Loading;

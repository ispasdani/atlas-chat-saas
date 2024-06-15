import React from "react";

const BlurryShapes = () => {
  return (
    <>
      <div className="absolute top-1/2 translate-y-1/2 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 translate-y-1/2 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
    </>
  );
};

export default BlurryShapes;

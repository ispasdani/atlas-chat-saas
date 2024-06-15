import { SpokeSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center p-10 justify-center">
      <SpokeSpinner />
    </div>
  );
}

export default Loading;

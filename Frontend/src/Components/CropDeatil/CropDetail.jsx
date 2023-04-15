import React from 'react'
import Filter from "./Components/Filter/Filter";
import CropCards from "./Components/CropCards/CropCards";

export default function CropDetail() {
  return (
    <div className="flex">
        <Filter />
        <CropCards />
      </div>
  )
}

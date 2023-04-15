import React from 'react'
import Filter from "../Filter/Filter";
import CropCards from "../CropCards/CropCards";

export default function CropDetail() {
  return (
    <div className="flex">
        <Filter />
        <CropCards />
      </div>
  )
}

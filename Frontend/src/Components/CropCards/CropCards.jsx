import React from "react";
import CropBox from "./CropBox";

const CropCards = () => {
  const data = [
    {
      sellerName: "John Doe",
      name: "Wheat",
      date: "12/12/2021",
      qty: 100,
      price: 100,
      desc: "This is the one of the best crop in the the region of Punjab, especially in the district of Amritsar.",
      phone : "1234567890"
    },
    {
      sellerName: "John Doe",
      name: "Wheat",
      date: "12/12/2021",
      qty: 100,
      price: 100,
      desc: "This is the one of the best crop in the the region of Punjab, especially in the district of Amritsar.",
      phone : "1234567890"
    },
    {
      sellerName: "John Doe",
      name: "Wheat",
      date: "12/12/2021",
      qty: 100,
      price: 100,
      desc: "This is the one of the best crop in the the region of Punjab, especially in the district of Amritsar.",
      phone : "1234567890"
    },
    {
        name: "Wheat",
        date: "12/12/2021",
        qty: 100,
        price: 100,
        desc: "This is the one of the best crop in the the region of Punjab, especially in the district of Amritsar.",
    },
  ];

  return (
    <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 w-full">
      {data.map((crop, index) => (
        <div key={index} className="col-span-1 md:col-span-2 lg:col-span-1">
          <CropBox crop={crop} />
        </div>
      ))}
    </div>
  );
};

export default CropCards;

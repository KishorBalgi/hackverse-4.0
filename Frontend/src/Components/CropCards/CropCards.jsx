import React from "react";
import CropBox from "./CropBox";

const CropCards = () => {
  const data = [
    {
      profilePhoto:
        "https://images.unsplash.com/photo-1610392347869-1b2f1b2f1b2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      sellerName: "John Doe",
      name: "Wheat",
      date: "12/12/2021",
      qty: 100,
      price: 100,
      desc: "This is the one of the best crop in the the region of Punjab, especially in the district of Amritsar.",
    },
    {
      sellerPhoto:
        "https://images.unsplash.com/photo-1610392347869-1b2f1b2f1b2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      sellerName: "John Doe",
      name: "Wheat",
      date: "12/12/2021",
      qty: 100,
      price: 100,
    },
    {
      sellerPhoto:
        "https://images.unsplash.com/photo-1610392347869-1b2f1b2f1b2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      sellerName: "John Doe",
      name: "Wheat",
      date: "12/12/2021",
      qty: 100,
      price: 100,
    },
    {
        sellerPhoto:
          "https://images.unsplash.com/photo-1610392347869-1b2f1b2f1b2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        sellerName: "John Doe",
        name: "Wheat",
        date: "12/12/2021",
        qty: 100,
        price: 100,
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

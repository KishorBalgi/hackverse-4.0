import React, { useEffect } from "react";
// import Filter from "../Filter/Filter";
// import CropCards from "../CropCards/CropCards";
import CropBox from "../CropCards/CropBox";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../Config";

export default function CropDetail() {
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [dateOfHarvest, setDateOfHarvest] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/api/item/all")
      .then((res) => {
        console.log(res);
        setData(res.data.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let query_url = "api/item/all?";
    if (productType !== "") {
      query_url += `cartItem=${productType}`;
    }
    if (quantity !== "") {
      query_url += `&quantity=${quantity}`;
    }
    if (price !== "") {
      query_url += `&price=${price}`;
    }
    if (dateOfHarvest !== "") {
      query_url += `&dateOfHarvest=${dateOfHarvest}`;
    }
    console.log(query_url);

    api
      .get(query_url)
      .then((res) => {
        console.log(res);
        setData(res.data.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex my-5 ml-10">
      <div className="w-1/2 flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h1 className="font-bold text-gray-700 text-center">Filter</h1>
        <div className="m-4 ">
          <label htmlFor="productType" className="font-bold text-gray-700">
            Product Type
          </label>
          <select
            name="productType"
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select</option>
            <option value="paddy">Paddy</option>
            <option value="wheat">Wheat</option>
            <option value="potato">Potato</option>
            <option value="tomato">Tomato</option>
          </select>
        </div>

        <div className="m-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="m-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="m-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Choose the date
          </label>
          <DatePicker
            selected={dateOfHarvest}
            dateFormat="dd/MM/yyyy"
            className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full text-gray-700 leading-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
            placeholderText="Select a date"
            isClearable
            value={dateOfHarvest}
            onChange={(date) => {
              const d = new Date(date).toLocaleDateString("fr-FR");
              setDateOfHarvest(d);
            }}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 w-full">
        {data.map((crop, index) => (
          <div key={index} className="col-span-1 md:col-span-2 lg:col-span-1">
            <CropBox crop={crop} />
          </div>
        ))}
      </div>
    </div>
  );
}

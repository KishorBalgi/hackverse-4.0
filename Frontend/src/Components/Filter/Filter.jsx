import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = () => {
  const [productType, setProductType] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [variety, setVariety] = useState("");
  const [productionMode, setProductionMode] = useState("");
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-1/2 flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md bg-emerald-100">
      <h1 className="font-bold text-gray-700 text-center">Filter</h1>
      <div className="m-4 ">
        <label htmlFor="productType" className="font-bold text-gray-700">
          Product Type
        </label>
        <select
          id="productType"
          value={productType}
          //   onChange={handleProductTypeChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select Product</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="barley">Barley</option>
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="quantity"
          type="number"
          placeholder="Enter quantity"
          min="0"
        />
      </div>

      <div className="m-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
          Price
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5 rounded-md"
            placeholder="Enter price"
            aria-describedby="price-currency"
            id="price"
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
            Rs.
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500" id="price-currency">
          Prices must be entered in Rupees.
        </p>
      </div>

      <div className="m-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
          Choose the date
        </label>
        <DatePicker
          selected={selectedDate}
          dateFormat="dd/MM/yyyy"
          className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full text-gray-700 leading-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
          placeholderText="Select a date"
          isClearable
          //   showIcon={<FontAwesomeIcon icon={faCalendarAlt} />}

          value={Cdate}
          onChange={(date) => {
            const d = new Date(date).toLocaleDateString("fr-FR");
            console.log(d);
            // setDate(d);
          }}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default Filter;

// item, qty, price, date

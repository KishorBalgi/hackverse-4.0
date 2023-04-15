import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

const CropBox = ({ crop }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => setShowDescription(!showDescription);
  return (
    <div className="max-w-sm">
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-zinc-300" title="mammals">
        <div class="flex flex-col items-center pb-10">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-black">
            {crop.name}
          </h5>

          <p className="text-gray-700">Quantity : {crop.qty}</p>
          <p className="text-gray-700">
            <p className="text-gray-700">Price : {crop.price}</p>
          </p>
          <p className="text-gray-500">
            <p className="text-gray-700">Date : {crop.date}</p>
          </p>
          <div class="flex mt-4 space-x-3 md:mt-6 mr-2 ml-2">
          <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={toggleDescription}
            >
              {showDescription ? 'Hide Description' : 'Show Description'}
            </button>
            <a
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              <AiOutlineShoppingCart size={30}/>Add to Cart
            </a>
          </div>
          {showDescription && (
            <div className="mt-4 mr-2 ml-2">
              <p className="text-gray-700 font-bold">
                {crop.desc}
              </p>
              <p className="font-medium">Seller phone : {crop.phone} </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropBox;

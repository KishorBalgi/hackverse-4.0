import React from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineCaretUp,
  AiOutlineCaretDown,
} from "react-icons/ai";
import { useState } from "react";
import { useCart } from "../../Context/cartContext";

const CropBox = ({ crop }) => {
  const [showDescription, setShowDescription] = useState(false);
  const { cart, setCart } = useCart();

  const addToCart = () => {
    const newCart = [...cart, crop];
    setCart(newCart);
  };

  const toggleDescription = () => setShowDescription(!showDescription);
  return (
    <div className="max-w-sm">
      <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md"
        title="mammals"
      >
        <div class="flex flex-col items-left p-5">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-black">
            {crop.title}
          </h5>

          <p className="text-gray-700">Quantity : {crop.quantity}</p>
          <p className="text-gray-700">
            Cart Item: {crop.cartItem[0].toUpperCase() + crop.cartItem.slice(1)}
          </p>
          <p className="text-gray-700">Price : {crop.price}</p>
          <p className="text-gray-500">
            <p className="text-gray-700">
              Date : {new Date(crop.dateOfHarvest).toDateString()}
            </p>
          </p>
          <div class="flex mt-4 space-x-3 md:mt-6 mr-2 ml-2">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={toggleDescription}
            >
              {showDescription ? "Hide Description" : "Show Description"}
            </button>
            <a
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={addToCart}
            >
              <AiOutlineShoppingCart size={30} />
              Add to Cart
            </a>
          </div>
          <div class="grid grid-cols-2 place-items-center mt-6">
            <p className="grid grid-cols-2 w-full place-items-center px-8">
              <AiOutlineCaretUp
                size={30}
                color="#00ff00"
                className="shadow-md rounded-full m-5 bg-white"
              />
              {crop.seller[0].upvotes}
            </p>
            <p className="grid grid-cols-2 w-full place-items-center px-8">
              <AiOutlineCaretDown
                size={30}
                color="#ff0000"
                className="shadow-md rounded-full m-5 bg-white"
              />
              {crop.seller[0].downvotes}
            </p>
          </div>
          {showDescription && (
            <div className="mt-4 mr-2 ml-2">
              <p className="text-gray-700 font-bold">{crop.description}</p>
              <p className="font-medium">
                Seller phone : {crop.seller[0].phone}{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropBox;

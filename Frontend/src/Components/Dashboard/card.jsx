import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product, pur = false }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {/* <div className="md:flex"> */}
      {/* <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/300x200" alt="card image" />
                </div> */}
      {console.log(product)}
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {product.item.title}
        </div>
        <p className="mt-2 text-gray-500">{product.item.description}</p>
        <p className="mt-2 text-gray-500">Quantity {product.quantity}</p>
        <p className="mt-2 text-gray-500">
          Date {new Date(product.dateOfPurchase).toDateString()}
        </p>
        <a
          href="#"
          className="mt-5 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-400 transition-colors duration-300 ease-in-out inline-block"
        >
          &#8377;{product.price}
        </a>
        {pur && (
          <button
            className="mx-5 bg-black text-white rounded-md px-4 py-2"
            // onclick={navigate(
            //   `/review/${product.item.seller}/${product.item._id}`
            // )}
          >
            Add Review
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;

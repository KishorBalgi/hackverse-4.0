import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Product 1",
      description: "Product 1 description",
      price: 100,
      quantity: 1,
    },
  ]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

import { useState, useEffect } from "react";
import { useCart } from "../../Context/cartContext";
import api from "../../Config";
const UserCart = () => {
  const { cart, setCart } = useCart();
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  console.log(cartItems);

  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  }, [cartItems]);

  const removeItem = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
    setCart(newCart);
  };

  const increaseQuantity = (id) => {
    const newCart = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newCart);
    setCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(newCart);
    setCart(newCart);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const calculateTotalItems = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    setTotalItems(total);
  };

  const CheckoutCart = (e) => {
    e.preventDefault();
    cartItems.forEach((item) => {
      api
        .post("/api/purchase/create", {
          item: item._id,
          quantity: item.quantity,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            console.log("Purchase successful");
            const newCart = cartItems.filter((i) => i._id !== item._id);
            setCartItems(newCart);
            setCart(newCart);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  return (
    <div className="cart grid place-items-center">
      <div className="cart__header">
        <h1 className="text-center text-3xl font-bold my-10">Cart</h1>
      </div>
      <div className="cart__body w-11/12 mx-auto align-center">
        {cart !== null ||
          (cartItems.length === 0 && (
            <div className="cart__empty">
              <h1>Cart is empty</h1>
            </div>
          ))}
        {cartItems.length > 0 && (
          <div className="cart__items">
            {cartItems.map((item) => (
              <div
                className="cart__item border-2 shadow-md rounded-lg p-4 my-4 grid grid-cols-4 place-items-center"
                key={item.id}
              >
                <p>{item.title}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="grid grid-cols-3">
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="rounded-full text-white font-bold bg-black m-4 w-auto"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-white bg-black px-5 py-2 rounded-full my-4"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="rounded-full text-white font-bold bg-black m-4 w-auto"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart__footer">
        <div className="cart__footer__total">
          <p className="text-lg font-bold">Total Items: {totalItems}</p>
          <p className="text-lg font-bold">Total Price: {totalPrice}</p>
        </div>
        <button
          className="text-white bg-black px-5 py-2 rounded-full my-4"
          onClick={(e) => CheckoutCart(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default UserCart;

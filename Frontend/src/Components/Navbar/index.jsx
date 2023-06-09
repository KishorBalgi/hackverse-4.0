import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../Config";
import { useUser } from "../../Context/userContext";
import { AiFillCompass } from "react-icons/ai";

const Navbar = () => {
  const { user, setUser } = useUser();
  // const [coins, setCoins] = React.useState(0);
  // console.log(user);

  // useEffect(() => {
  //   if (user !== null) {
  //     setCoins(user.coins);
  //   }
  // }, [user]);

  const logoutHandler = () => {
    api
      .get("/api/auth/logout")
      .then((res) => console.log("User logged out"))
      .catch((err) => console.log(err.message));

    setUser(null);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <p className="text-3xl font-bold text-white">FarmFavor</p>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/marketplace"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Market Place
                </Link>

                <Link
                  to="/addproduct"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sell Your Product
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>

                <Link
                  to="/cart"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Your Cart
                </Link>
              </div>
            </div>
          </div>

          {/* User menu */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              {user === null ? (
                <>
                  <Link
                    to="/signin"
                    className="bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={logoutHandler}
                    className="bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                  {/* <p className="text-white text-xl w-fit gird grid-cols-2 place-items-center">
                    <AiFillCompass size={20} color="#FFD700" />
                    {coins}
                    {console.log(coins)}
                  </p> */}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

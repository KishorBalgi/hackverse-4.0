import React, { useState } from "react";
import api from "../../Config";
import Alert from "../../Utils/alert";

// User sign in page
const SignIn = () => {
  const [formData, setFormData] = useState({
    phoneno: "",
    password: "",
  });
  const [status, setStatus] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    api
      .post(
        "/api/auth/login",
        {
          phone: formData.phoneno,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200)
          setStatus({ message: res.data.message, type: "ok" });
        else setStatus({ message: res.message, type: "error" });
      })
      .catch((err) => {
        setStatus({ message: err.message, type: "error" });
      });
  };

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <Alert message={status.message} type={status.type} />
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="phoneno"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phoneno"
              name="phoneno"
              value={formData.phoneno}
              onChange={inputHandler}
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

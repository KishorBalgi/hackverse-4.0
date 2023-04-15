import React, { useState } from "react";

// User sign up page 
const SignUp = () => {
    const [formData , setFormData] = useState({
        email : '',
        password : ''
    });

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const inputHandler = (e) => {
        setFormData({
            ...formData ,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={inputHandler}
                            className="border rounded-md py-2 px-3 w-full"
                            placeholder="Enter your email address"
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
                            placeholder="Enter your password"
                        />
                    </div>
                    {/* <div className="mb-6">
                        <label htmlFor="checkbox" className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="checkbox"
                                className="form-checkbox h-5 w-5 text-gray-600"
                            />
                            <span className="ml-2 text-gray-700">
                                I agree to the terms and conditions
                            </span>
                        </label>
                    </div> */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

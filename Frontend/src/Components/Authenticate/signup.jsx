import React, { useState } from "react";
import api from "../../Config";
import Alert from "../../Utils/alert";
import { useNavigate } from "react-router-dom";

// User sign up page 
const SignUp = () => {
    const [formData , setFormData] = useState({
        name : '',
        phoneno : '',
        password : ''
    });
    const [status , setStatus] = useState({});
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        api.post('/api/auth/signup' , {
            name : formData.name,
            phone : formData.phoneno,
            password : formData.password
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok)
                navigate(`/otp/${formData.phoneno}`);
            else
                setStatus({ message: res.message, type: "error" });
        })
        .catch(err => {
            setStatus({ message: err.message, type: "error" });
        });
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
                <Alert message={status.message} type={status.type}/>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={inputHandler}
                            className="border rounded-md py-2 px-3 w-full"
                            placeholder="Enter name"
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

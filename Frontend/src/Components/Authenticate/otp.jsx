import { useState } from "react";

const OTP = () => {

    const [phoneno, setPhoneno] = useState();
    const [otp, setOtp] = useState();

    const submitNumberHandler = (e) => {
        e.preventDefault();
        console.log(phoneno);
    }

    const otpSubmitHandler = (e) => {
        e.preventDefault();
        console.log(otp);
    }

    const numberHandler = (e) => {
        setPhoneno(e.target.value);
    }

    const otpHandler = (e) => {
        setOtp(e.target.value);
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">OTP Authentication</h2>
                <form onSubmit={submitNumberHandler}>
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
                            value={phoneno}
                            onChange={numberHandler}
                            className="border rounded-md py-2 px-3 w-full"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Send OTP
                    </button>
                </form>
                <form>

                    <div className="mb-4">
                        <label
                            htmlFor="otp"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            OTP
                        </label>
                        <input
                            type="number"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={otpHandler}
                            className="border rounded-md py-2 px-3 w-full"
                            placeholder="Enter OTP"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OTP;
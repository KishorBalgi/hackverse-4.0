import { useState } from "react";
import api from "../../Config";
import Alert from "../../Utils/alert";
import { useParams } from "react-router-dom";

const OTP = () => {

    // const [phoneno, setPhoneno] = useState();
    const [otp, setOtp] = useState();
    const [status , setStatus] = useState({});
    const params = useParams();

    // const submitNumberHandler = (e) => {
    //     e.preventDefault();
    //     api.get(`/api/auth/sendOTP?phone=${phoneno}`)
    //         .then(res => {
    //             if(res.ok)
    //                 setStatus({ message : "OTP sent to number" , type : "ok" })
    //         })
    //         .catch(err => {
    //             setStatus({ message : "Unable to send OTP" , type : "error" })
    //         });
    // }

    const otpSubmitHandler = (e) => {
        e.preventDefault();
        api.get(`api/auth/verifyOTP?phone=${params.phoneno}&code=${otp}`)
            .then(res => {
                if(res.ok)
                    setStatus({ message : "OTP is verified" , type : "ok" })
            })
            .catch(err => {
                setStatus({ message : "Unable to verify OTP" , type : "error" })
            });
    }

    // const numberHandler = (e) => {
    //     setPhoneno(e.target.value);
    // }

    const otpHandler = (e) => {
        setOtp(e.target.value);
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">OTP Authentication</h2>
                <Alert message={status.message} type={status.type}/>
                {/* <form onSubmit={submitNumberHandler}>
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
                </form> */}
                <form onSubmit={otpSubmitHandler}>

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
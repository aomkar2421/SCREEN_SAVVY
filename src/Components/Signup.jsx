import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { Appstate } from "../App";

const Signup = () => {
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    name : "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState('');

  return (
    <div className="w-full min-h-screen" >
      <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-3xl font-bold text-white">Sign Up</h1>

        {
          otpSent ?
          <>
          <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label className="leading-7 text-sm text-gray-300">
                OTP
              </label>
              <input
                id="message"
                name="message"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <button className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
            </button>
          </div>
          </>
          :
          <>
            <div className="p-2 w-full md:w-1/3">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-300">
                  Name
                </label>
                <input
                  id="message"
                  name="message"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full md:w-1/3">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-300">
                  Mobile No.
                </label>
                <input
                  type={"number"}
                  id="message"
                  name="message"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full md:w-1/3">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-300">Password</label>
                <input
                  id="message"
                  name="message"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                {loading ? <TailSpin height={25} color="white" /> : "Sign Up"}
              </button>
            </div>
          </>
        }

        <div>
          <p className="text-white">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-500 ">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
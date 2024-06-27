import React, { useState,   } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, 'users', user.uid),{
            email : user.email,
            name : name
          });
        }
        console.log("User registred")
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 1000,
        });
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login')
    }catch(err){
        console.log(err);
        swal({
          text: err,
          icon: "error",
          buttons: false,
          timer: 1000,
        });
    }
    setLoading(false);
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col mt-8 items-center">
        <h1 className="text-3xl font-bold text-white">Sign Up</h1>

        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-300">Name</label>
            <input
              name="message"
              value={name}
              onChange={(e) => setName(e.target.value )}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="message"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="message"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-full">
          <button
            onClick={register}
            className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Register"}
          </button>
        </div>

        <div>
          <p className="text-white">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-500 ">Login</span>
            </Link>
          </p>
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase/firebase"; // Ensure db is correctly imported
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../App";
import { doc, getDoc } from "firebase/firestore"; // Ensure firestore methods are correctly imported

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const appState = useContext(Appstate);

  const login = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      console.log("User Logged In");

      // Correctly access the uid from userCredential.user
      const uid = userCredential.user.uid;

      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      const name = docSnap.data().name;

      // console.log('docSnap :- ', docSnap);
      // console.log('docSnap Data :- ', docSnap.data());
      // console.log('Name is :- '+name)

      swal({
        text: "Logged In Successfully",
        icon: "success",
        buttons: false,
        timer: 1000,
      });
      setEmail("");
      setPassword("");

      appState.setLogin(true);
      appState.setUserName(name);
      navigate("/");
    } catch (err) {
      console.error(err);
      let errorMessage = "An error occurred. Please try again.";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        default:
          errorMessage = err.message;
      }
      console.log(errorMessage)
      swal({
        text: errorMessage,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col mt-8 items-center">
        <h1 className="text-3xl font-bold text-white">Login</h1>

        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-full">
          <button
            onClick={login}
            className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Login"}
          </button>
        </div>

        <div>
          <p className="text-white">
            Dont have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-blue-500">Sign Up</span>
            </Link>
          </p>
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;

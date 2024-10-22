import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/userApiSlice";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/dashboard";
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("passwords don't match");
        return;
      } else {
        const res = await register({ name, email, password }).unwrap();
        dispatch(userCredentials({ ...res }));
        toast.success("Login succesfully");
        navigate(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="mx-auto sm:px-3 md:px-0 mt-6 md:mt-12"
    >
      {/* // sign in form goes Here  */}

      <form
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md "
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-800 text-sm font-bold"
          >
            Email
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter your Name"
            className="border-2 border-gray-300 p-2 w-full rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your Email"
            className="border-2 border-gray-300 p-2 w-full rounded-md outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-500 text-sm font-bold"
          >
            password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password  "
            className="border-2 border-gray-100 p-2 w-full rounded-md outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-500 text-sm font-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="enter your password  "
            className="border-2 border-gray-100 p-2 w-full rounded-md outline-none"
          />
        </div>

        <button
          className="px-5 bg-blue-500  p-2  rounded-2xl text-slate-100"
          type="submit"
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>

        <div className="py-2 text-lg font-bold text-gray-400 cursor-pointer">
          <p>
            Already have An Account{" "}
            <Link to="/login" className="text-blue-600 ml-2 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterScreen;
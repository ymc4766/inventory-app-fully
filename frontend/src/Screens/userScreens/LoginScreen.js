import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(userCredentials({ ...res }));
      toast.success("Login succesfully");
      navigate(redirect);
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
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
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

        <button
          className="px-5 bg-blue-500  p-2  rounded-2xl text-slate-100"
          type="submit"
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>

        <div className="py-2 text-lg font-bold text-gray-400 cursor-pointer">
          <p>
            don't have An Account{" "}
            <Link to="/register" className="text-blue-600 ml-2 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginScreen;

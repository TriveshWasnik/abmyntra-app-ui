import React, { useState } from "react";
import pic from "/assets/images/banners/off300.png"
import Input from "../ui/Input";
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { loginSuccess } from "../store/userSlice";


function Login() {
  const navigate = useNavigate();

  // Set the User
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // login form visible or not
  const [login, setLogin] = useState(true);

  // store the value in redux
  const dispatch = useDispatch();

  // Handling the form
  function loginHandler() {
    setLogin(!login);
    setUser({ name: "", email: "", password: "" });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      if (!login) {
        // show the registraton Form
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signup`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            //withCredentials: true,
          }
        );



        if (res.data.success) {
          toast.success(`User Registered Successfully`, {
            position: "top-center",
          });
          setUser({
            name: "",
            email: "",
            password: "",
          });
          // if register redirect to login form
          setLogin(true);
        } else {
          toast.error(res.data.message, {
            position: "top-center",
          });
        }
      } else if (login) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signin`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            //withCredentials: true,
          }
        );



        if (res.data.success) {
          toast.success(`User Login Successfully`, {
            position: "top-center",
          });

          dispatch(loginSuccess(res.data));
          // if login success redirect to Home Page
          navigate("/");
        } else {
          toast.error(res.data.message, {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full min-h-[80vh]">
      <div className="w-96 max-w-[384px] shadow-md mt-10 mx-auto">
        <img src={pic} alt="300 Banner" />
        <div className="p-8">
          <p className="text-[#424553] font-semibold text-[18px] tracking-wide">
            {login ? "Login" : "Signup"} User
          </p>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-3 py-6 w-full ">
              {!login && (
                <Input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="User Name"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
                  icon={<FaUser />}
                  required
                />
              )}
              <Input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email Address"
                className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
                icon={<FaEnvelope />}
                required
              />
              <Input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Your password"
                className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
                icon={<FaKey />}
                required
              />
              <Button
                label={login ? "Login" : "Register"}
                type="submit"
                className="w-full text-white"
              />
              <p className="text-[18px] -mt-4 text-center">
                {login ? "Don't have an account?" : "Already have an account?"}
                <span
                  className="cursor-pointer pl-2 text-[#ff3f6c] font-semibold"
                  onClick={loginHandler}
                >
                  {login ? "Sign Up" : "Login"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

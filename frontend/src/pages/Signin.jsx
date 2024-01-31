import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinStart, signinSuccess } from "../redux/user/userSlicer";
// import { UseDispatch } from 'react-redux'

function Signin() {
  const [formData, setFormData] = useState({});
  //   const dispatch = UseDispatch()
  console.log(document.cookie);
  const { error, loading, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.msg) {
        alert(data.msg);
        return;
      }
      const { token, user } = data;
      localStorage.setItem("token", token);
      console.log(user);
      dispatch(signinSuccess(user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" rounded-xl bg-slate-200 p-4 w-[400px] flex flex-col gap-4">
        <div className=" text-center flex flex-col gap-3">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="text-slate-600">
            Enter your information to <br /> Login to your account
          </p>
        </div>
        <form onSubmit={handleOnSubmit} className="flex flex-col  gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xl">
              Email
            </label>
            <input
              onChange={handleOnChange}
              className="p-2  rounded-lg outline-none border-2 border-slate-300"
              type="text"
              id="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xl">
              Password
            </label>
            <input
              onChange={handleOnChange}
              className="p-2  rounded-lg outline-none border-2 border-slate-300"
              type="password"
              id="password"
              placeholder="Enter passoword"
              required
            />
          </div>

          <div>
            <button
              className=" bg-slate-950 text-white rounded-lg w-full p-2 font-bold tex"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div>
            <label />
            <div className="text-slate-500">
              Register an account?{" "}
              <Link className="text-slate-950" to="/">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");


  const{user,signup}=UserAuth();

  const navigate=useNavigate()


  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    signup(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="///"
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-nsans-bold">Sign Up</h1>

              <form  onSubmit ={handleFormSubmit}className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                />

                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />

                <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2"checked={rememberLogin} onChange=
                    {(e)=>setRememberLogin(!rememberLogin)} />
                    Remember me
                  </p>
                  <p>Need Help</p>
                </div>
                <p className="my-4">
                  <span className="text-gray-600 mr-2">
                    Already Subscribed to Netflix?
                  </span>
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

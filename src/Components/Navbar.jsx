import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();




  const handleLogOut = async()=>{
    try{
      await logOut()
      navigate('/')

    }catch (err) {
      console.log(err)
    }
   
  }

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50 ">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-sans-bold cursor-pointer text-5xl">
          netflix
        </h1>
      </Link>

      {user?. email ? (
        <div>
          <Link to="/">
            <button type="button" className="captalize pr-4 text-white">
              Profile
            </button>
          </Link>

          
            <button onClick={handleLogOut} className="captalize bg-red-600 px-6 py-2 rounded cursor-pointer">
              logout
            </button>
          
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button type="button" className="captalize pr-4 text-white">
              login
            </button>
          </Link>

          <Link to="/signup">
            <button className="captalize bg-red-600 px-6 py-2 rounded cursor-pointer">
              signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

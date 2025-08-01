import React, { useContext, useState } from "react";

// react icons
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { AuthContext } from "../../Contexts & Providers/AuthContext & Provider/AuthContext";
const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  return (
    <nav className="flex justify-self-center items-center justify-between relative  dark:bg-slate-900 bg-white rounded-full px-[10px] py-[8px] w-11/12 shadow mt-[20px]">
      {/* logo */}

      <div className="flex">
        <img
          src={logo}
          alt="logo"
          className="w-[30px] -mr-2.5 -mt-2.5 mb-3 rotate-3"
        />
        <p className="text-3xl font-bold">Duronto Courier</p>
      </div>

      {/* nav links */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          Services
        </li>

        <Link to={"/coverage"}>
          <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            Coverage
          </li>
        </Link>

        <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          About Us
        </li>

        <Link to={"/add-parcel"}>
          <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            Pricing
          </li>
        </Link>
        <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          Be a Rider
        </li>
        {user ? (
          <Link to={"/dashboard"}>
            <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              dashboard
            </li>
          </Link>
        ) : (
          ""
        )}
      </ul>

      {/* action buttons */}
      <div className="items-center gap-[10px] flex">
        {user ? (
          <>
            <button
              onClick={logOut}
              className="bg-[#CAEB66] dark:bg-[#abc2d3] text-[#424242] dark:text-slate-900 px-4 py-1 rounded-full hover:bg-[#3B9DF8] hover:text-white transition-all duration-300"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="py-[7px] text-[1rem] px-[16px] dark:text-[#abc2d3] rounded-full capitalize hover:text-[#caeb66] transition-all duration-300 sm:flex hidden">
                Sign in
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize text-gray-600  bg-[#CAEB66] transition-all duration-300 sm:flex hidden">
                Sign up
              </button>
            </Link>
          </>
        )}

        <CiMenuFries
          className="text-[1.8rem] dark:text-[#abc2d3] mr-1 text-[#424242]c cursor-pointer md:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      {/* mobile sidebar */}
      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1]"
        } md:hidden bg-white p-4 text-center absolute top-[65px] dark:bg-slate-700 right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
      >
        <div className="relative mb-5">
          <input
            className="py-1.5 pr-4 dark:bg-slate-800 dark:text-[#abc2d3] dark:border-slate-900/50 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
            placeholder="Search..."
          />
          <IoIosSearch className="absolute dark:text-slate-400 top-[8px] left-3 text-gray-500 text-[1.3rem]" />
        </div>
        <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            Services
          </li>

          <Link to={"/coverage"}>
            <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              Coverage
            </li>
          </Link>

          <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            About Us
          </li>

          <Link to={"/add-parcel"}>
            <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              Pricing
            </li>
          </Link>
          <li className="before:w-0 hover:before:w-full before:bg-[#CAEB66] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#caeb66] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            Be a Rider
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;

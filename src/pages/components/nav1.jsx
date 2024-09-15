import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Nav1() {
  const [user, setuser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const u = localStorage.getItem("user");
    setuser(u);
  });

  const handleClick = () => {
    localStorage.setItem("user", "9999");
    localStorage.setItem("secret", "9999");
    localStorage.removeItem("secret");
    navigate("/login");
    window.location.href = "/login";
  };
  return (
    <>
      <div className="nav p-2 bg-blue-950 text-white flex justify-between pl-7">
        <div className="logo">
          <span className="font-bold text-xl text-red-600">&lt;Show</span>
          <span className="font-bold text-xl text-green-600"> Me/&gt; </span>
        </div>

        <div className="options flex gap-7 px-3 py-1 ">
          {/* <NavLink to ="" className="bg-blue-900 py-[6px] w-[200px] text-center rounded-lg px-[10px] hover:bg-blue-800">1</NavLink> */}
          {/* <NavLink to ="" className="bg-blue-900 py-[6px] w-[200px] text-center  rounded-lg px-[10px] hover:bg-blue-800">2</NavLink> */}
          {localStorage.getItem("user") &&
            localStorage.getItem("user") != "9999" && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 py-[6px] w-[50px] text-center flex justify-center items-center rounded-lg px-[10px] hover:bg-blue-900"
                    : "bg-blue-900 py-[6px] w-[50px] text-center flex justify-center items-center rounded-lg px-[10px] hover:bg-blue-800"
                }
                // className="bg-blue-900 py-[6px] w-[200px] text-center  rounded-lg px-[10px] hover:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#ffffff"}
                  fill={"none"}
                >
                  <path
                    d="M12.0002 18L12.0002 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            )}
          {!localStorage.getItem("user") ||
            (localStorage.getItem("user") == "9999" && (
              <NavLink
                to="/"
                className="bg-blue-900  py-[3px] w-[100px] text-center  rounded-lg px-[3px] hover:bg-blue-800"
              >
                Sign Up
              </NavLink>
            ))}
          {localStorage.getItem("user") &&
            localStorage.getItem("user") != "9999" && (
              <NavLink
                to="/frnds"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 py-[6px] w-[50px] text-center flex justify-center items-center  rounded-lg px-[10px] hover:bg-blue-900"
                    : "bg-blue-900 py-[6px] w-[50px] text-center flex justify-center items-center rounded-lg px-[10px] hover:bg-blue-800"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#ffffff"}
                  fill={"none"}
                >
                  <path
                    d="M17.5 17.5L22 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
              </NavLink>
            )}
          {!localStorage.getItem("user") ||
            (localStorage.getItem("user") == "9999" && (
              <NavLink
                to="/"
                className="bg-blue-900  py-[3px] w-[100px] text-center  rounded-lg px-[3px] hover:bg-blue-800"
              >
                2
              </NavLink>
            ))}
          {localStorage.getItem("user") &&
            localStorage.getItem("user") != "9999" && (
              <button
                onClick={handleClick}
                className="bg-blue-900 flex justify200enter items-center w-[50px] text-center  rounded-lg px-[10px] hover:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#ffffff"}
                  fill={"none"}
                >
                  <path
                    d="M6 6.50006C4.15875 8.14802 3 10.3345 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 10.3345 19.8412 8.14802 18 6.50006"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2V11M12 2C11.2998 2 9.99153 3.9943 9.5 4.5M12 2C12.7002 2 14.0085 3.9943 14.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          {!localStorage.getItem("user") ||
            (localStorage.getItem("user") == "9999" && (
              <NavLink
                to="/login"
                className="bg-blue-900  py-[3px] w-[100px] text-center  rounded-lg px-[3px] hover:bg-blue-800"
              >
                LogIn
              </NavLink>
            ))}
          {localStorage.getItem("user") &&
            localStorage.getItem("user") != "9999" && (
              <div className="flex gap-1 justify-center items-center bg-blue-900 text-white font-bold p-1 py-[6px]  w-auto rounded-full  bottom-1 left-1 fixed text-center   px-[10px] hover:bg-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#ffffff"}
                  fill={"none"}
                >
                  <path
                    d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                {user}
              </div>
            )}
          {!localStorage.getItem("user") ||
            (localStorage.getItem("user") == "9999" && (
              <NavLink
                to="/login"
                className="bg-blue-900 py-[3px] w-[100px] text-center  rounded-lg px-[3px] hover:bg-blue-800"
              >
                4
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
}

export default Nav1;

import React, { useState } from "react";
import Nav1 from "../components/nav1";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setform] = useState({ userName: "", password: "" });
  // loading = 2 means login clicked
  const [loading, setloading] = useState(0);

  // const [hash, sethash] = useState("")

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e) => {
    const newValue = e.target.value;

    // Only allow empty string or integer numbers
    if (newValue === "" || /^[0-9]+$/.test(newValue)) {
      sethash(newValue);
    }
  };

  const handleLogin = async (e) => {
    setloading(2)
    let b = await fetch("https://show-me-back-deploy.vercel.app/api/signup/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    b = await b.json();
    console.log(b.message);

    if (b.message == 0) {
      alert("Invalid Username or password");
      return;
    } else {
      // localStorage.setItem("secret", hash);
      localStorage.setItem("user", form.userName);
      navigate("/");
      window.location.href = "/";
    }
    
    setloading(0)
  };
  return (
    <>
      <Nav1 />
      <div className="pt-[70px] min-h-[99vh] bg-blue-50">
        <div className=" flex justify-center items-center container max-w-[99vw] px-1 lg:max-w-[50vw] h-[60vh] bg-blue-300 m-auto lg:p-3 rounded-3xl">
          <div className="container2 bg-blue-200 py-4 px-1 lg:px-2 lg:w-[30vw] w-[90vw] inline-block rounded-2xl">
            <div className="inputs flex flex-col justify-center gap-2 items-center">
              <input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="mx-2 px-1 min-h-[70px] lg:min-w-[400px] my-1 bg-white rounded-2xl"
              />
              {form.userName.length < 5 ? (
                form.userName.length >= 1 ? (
                  <div className="text-[14px] font-bold ml-[6vw] text-red-600 ">
                    {5 - form.userName.length} more characters needed minimum
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="mx-2 px-1 min-h-[70px] lg:min-w-[400px] my-1 bg-white rounded-2xl"
              />
              {form.password.length < 5 ? (
                form.password.length >= 1 ? (
                  <div className="text-[14px] font-bold ml-[6vw] text-red-600 ">
                    {5 - form.password.length} more characters needed minimum
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
       

              {loading == 0 && (
                <button
                  className="border-2  border-blue-950 text-white px-2 py-1 disabled:bg-blue-900 rounded-lg bg-blue-600"
                  onClick={handleLogin}
                  disabled={
                    form.userName.length < 5 || form.password.length < 5
                  }
                  // className="bg-green-900 disabled:bg-green-950 hover:bg-green-800 text-white rounded-2xl h-[60px] py-2 px-3 mt-[9px]"
                >
                  Log in
                </button>
              )}

              {loading == 2 && (
                <button
                  className="border-2  border-blue-950 text-white px-2 py-1 disabled:bg-blue-900 rounded-lg bg-blue-600"

                  // className="bg-green-900 disabled:bg-green-950 hover:bg-green-800 text-white rounded-2xl h-[60px] py-2 px-3 mt-[9px]"
                >
                  <div className="flex items-center justify-center ">
                    <div className="w-[40px] h-[40px] border-t-4 border-blue-500 border-solid rounded-full animate-spin">
                      *
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

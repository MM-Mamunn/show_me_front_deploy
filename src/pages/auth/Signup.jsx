import React, { useState } from "react";
import Nav1 from "../components/nav1";

function Signup() {
  const [form, setform] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    let b = await fetch("http://localhost:3000/api/signup/usercheck/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    b = await b.json();
    console.log(b.message);

    if (b.message == 1) {
      alert("The Username already taken");
      return;
    }

    let a = await fetch("http://localhost:3000/api/signup/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    a = await a.json();
    if (a) {
      setform({ userName: "", password: "" });
      alert("success");
    }
  };

  return (
    <>
      <Nav1 />
      <div className="pt-[70px] min-h-[99vh] bg-blue-50">
        <div className="flex justify-center items-center container max-w-[50vw] h-[60vh] bg-blue-300 m-auto p-3 rounded-3xl">
          <div className="container2 bg-blue-200 py-4 px-2 inline-block rounded-2xl">
            <div className="inputs flex flex-col justify-center gap-2 items-center">
              <input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="mx-2 px-1 min-h-[70px] min-w-[400px] my-1 bg-white rounded-2xl"
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
                type="text"
                placeholder="Password"
                className="mx-2 px-1 min-h-[70px] min-w-[400px] my-1 bg-white rounded-2xl"
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
              <button
                className="border-2  border-blue-950 text-white px-2 py-1 disabled:bg-blue-900 rounded-lg bg-blue-600"
                onClick={handleSignup}
                disabled={form.userName.length < 5 || form.password.length < 5}
                // className="bg-green-900 disabled:bg-green-950 hover:bg-green-800 text-white rounded-2xl h-[60px] py-2 px-3 mt-[9px]"
              >
                signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

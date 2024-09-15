import React, { useEffect, useRef, useState } from "react";

function Chatbox({ chatFriend, sharedstate, setsharedstate }) {
  const [text, settext] = useState("");
  const [user, setuser] = useState("");
  const [all, setall] = useState([]);
  const [hash, sethash] = useState(0);
  const [code, setcode] = useState(0);
  const [refresh, setrefresh] = useState(0)
  const scrollRef = useRef(null);
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  ///decode
  function recoverString(str, n) {
    const shiftCharBackward = (char, n, start) => {
      const charCode = char.charCodeAt(0);
      const newCharCode = ((charCode - start - n + 26) % 26) + start;
      return String.fromCharCode(newCharCode);
    };

    return str
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          return shiftCharBackward(char, n, 65);
        } else if (char >= "a" && char <= "z") {
          return shiftCharBackward(char, n, 97);
        } else {
          return char;
        }
      })
      .join("");
  }
  useEffect(() => {
    if(!scrollRef.current || !all.length || hash == -1)
      return;
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight )
  }, [scrollRef,all])
  
  const refreshcontinious = async () => {
    await delay(100);
    await fetchall();
    if(refresh > 0)
      setrefresh(0);
    else 
    setrefresh(refresh + 1);
  }
  function removeKey(array, keyToRemove) {
    return array.map(obj => {
        // Create a shallow copy of the object
        const { [keyToRemove]: _, ...newObj } = obj;
        return newObj;
    });
}

  const fetchall = async () => {
    let user = localStorage.getItem("user");
    console.log("chatfriendd", chatFriend);

    let a = {
      from: user,
      to: chatFriend,
    };
    await delay(100);
    let b = await fetch("http://localhost:3000/api/msg/all/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    });
    b = await b.json();
    for (let i = 0; i < b.length; i++) {
      let xx = parseInt(hash, 10);
      let recoveredString = recoverString(b[i].text, xx);
      b[i].text = recoveredString;
    }
    
    const filteredB = removeKey(b, "updatedAt");
const filteredAll = removeKey(all, "updatedAt");

if (JSON.stringify(filteredB) === JSON.stringify(filteredAll)) {
    return;
}
    
    setall(b);
    setsharedstate(sharedstate + 1);
  };
  useEffect(() => {
    let u = localStorage.getItem("user");

    setuser(u);
    if (!localStorage.getItem("secret") && chatFriend != "9999") {
      sethash(-1);
    } else if (chatFriend != "9999") {
      const storedarray = JSON.parse(localStorage.getItem("secret")) || [];

      let objectfind =
        storedarray.filter((item) => item.name == chatFriend) || [];

      if (objectfind.length) {
        sethash(objectfind[0].code);
       
        fetchall();
      } else {
        sethash(-1);
      }
    }
    refreshcontinious();
    setsharedstate(sharedstate + 1);
  }, [chatFriend, hash,refresh]);

  const handleChange = (e) => {
    settext(e.target.value);
    setsharedstate(sharedstate + 1);
  };

  function shiftString(str, n) {
    const shiftCharForward = (char, n, start) => {
      const charCode = char.charCodeAt(0);
      const newCharCode = ((charCode - start + n) % 26) + start;
      return String.fromCharCode(newCharCode);
    };

    return str
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          return shiftCharForward(char, n, 65);
        } else if (char >= "a" && char <= "z") {
          return shiftCharForward(char, n, 97);
        } else {
          return char;
        }
      })
      .join("");
  }
  const handleChange2 = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || /^[0-9]+$/.test(newValue)) {
      setcode(newValue);
    }
    setsharedstate(sharedstate + 1);
  };

  const handleClick = async (e) => {
    const newobject = {
      name: chatFriend,
      code: code,
    };
    let existinarray = [];
    if (localStorage.getItem("secret"))
      existinarray = JSON.parse(localStorage.getItem("secret")) || [];
    existinarray.push(newobject);
    localStorage.setItem("secret", JSON.stringify(existinarray));

    const temp = parseInt(code, 10);
    sethash(2);
    fetchall();
  };
  const handlerefresh = () => {
    fetchall();
  };
  const handleText = async () => {
    let xx = parseInt(hash, 10);
    const shiftedString = shiftString(text, xx);

    let a = {
      from: user,
      to: chatFriend,
      text: shiftedString,
    };
    let b = await fetch("http://localhost:3000/api/msg/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    });
    b = await b.json();
    await delay(100);
    fetchall();
    settext("");
  };
  return (
    <>
      {hash == -1 && (
        <div className="pt-[70px] min-h-[99vh] bg-blue-50">
          <div className="flex justify-center items-center container max-w-[50vw] h-[63vh] bg-blue-300 m-auto p-3 rounded-3xl">
            <div className="container2 bg-blue-200 py-4 px-2 inline-block rounded-2xl">
              <div className="inputs flex flex-col justify-center gap-2 items-center">
                <div className="msg font-bold bg-blue-400 text-blue-900 text-center rounded-lg break-words  p-2 w-[20vw]">
                  Enter the secret Key between you and {chatFriend}
                </div>
                <input
                  name="code"
                  type="text"
                  value={code}
                  onChange={handleChange2}
                  placeholder="Enter an integer secret key"
                  className="mx-2 px-1 min-h-[70px] min-w-[400px] my-1 bg-white rounded-2xl"
                />
                <button
                  className="border-2  border-blue-950 text-white px-2 py-1 disabled:bg-blue-900 rounded-lg bg-blue-600"
                  onClick={handleClick}
                  disabled={code.length < 1}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {hash != -1 && (
        <div className=" flex flex-col ">

          <div
            ref={scrollRef}
            className="scrl overflow-y-scroll no-scroll scrollbar-thin scrollbar-thumb-blue-700  scrollbar-track-gray-200  h-[77vh] box border-2 w-full "
          >
            {chatFriend == "9999" && (
              <div className="py-[34vh] px-[40px] font-bold text-2xl opacity-30 text text-slate-500">
                Don't Show Your Messages to anyone without your permissions
              </div>
            )}
            {chatFriend != "9999" &&
              all?.map((item, index) => (
                <div
                  key={index}
                  className={
                    item.from == user
                      ? "one text-[20px] bg-blue-700 max-w-[40vw] text-white rounded-xl break-words bo ml-[35vw] mt-2 p-2"
                      : "one  max-w-[40vw]  break-words text-[20px] bg-slate-600 rounded-xl text-white ml-[4vw] mt-2 p-2"
                  }
                >
                  {item.text}
                  <div className="date pl-[340px] opacity-40 text-black text-[20px]">
                    {item.createdAt}
                  </div>
                </div>
              ))}
            {chatFriend != "9999" && all.length == 0 && (
              <div className="py-[34vh] px-[40px] font-bold text-2xl opacity-30 text text-slate-500">
                Be the first to message
              </div>
            )}
          </div>

          {chatFriend != "9999" && (
            <div className="input  w-full flex ">
              <input
                name="text"
                value={text}
                onChange={handleChange}
                type="text"
                placeholder="text"
                className="mx-3 px-2 min-h-[70px] min-w-[70vw]  bg-white rounded-2xl"
              />
              <button
                className=" font  w-[70px] h-[70px] p-1 rounded-full flex justify-center items-center text-white px-2 py-1 disabled:bg-blue-900  bg-blue-600"
                onClick={handleText}
                disabled={text.length < 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#ffffff"
                  fill="none"
                >
                  <path
                    d="M22 12.5001C22 12.0087 21.9947 11.0172 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C9.90159 20.4836 10.7011 20.4954 11.5 20.4989"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 6L8.91302 9.92462C11.4387 11.3585 12.5613 11.3585 15.087 9.92462L22 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 17.5L14 17.5M22 17.5C22 16.7998 20.0057 15.4915 19.5 15M22 17.5C22 18.2002 20.0057 19.5085 19.5 20"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Chatbox;

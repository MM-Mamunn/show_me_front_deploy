import React, { useState, useEffect } from 'react';
import Chatbox from './Chatbox';
import Nav1 from '../components/nav1';

function Home() {
    const [user, setUser] = useState();
    const [friends, setFriends] = useState([]);
    const [chatFriend, setchatFriend] = useState("9999")
    const [sharedstate, setsharedstate] = useState(0)

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser);
            if (storedUser) {
                await fetchFriends(storedUser);
            }
        };

        const fetchFriends = async (username) => {
            try {
              
              
                let response = await fetch(`http://localhost:3000/api/frnd/frnds/${username}`);
                let data = await response.json();
                
                setFriends(data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        fetchUserData();
    }, [sharedstate]); // Empty dependency array ensures this runs once on component mount


    const handleClick=(async(e,userName2) => {
      setchatFriend(userName2);
      console.log("chat",chatFriend);
      
    })
    return (
        <div className='h-[100vh] bg-blue-100'>
          <Nav1 />
            <div className="container flex h-[79vh] ">
                <div className="side py-2  bg-blue-300 flex flex-col gap-2  items-center min-w-[20vw] h-[88.5vh] border-x-2 border-blue-950">
                    {friends?.map((item, index) => (
                        <div key={index}>
                          <button  onClick={(e) => handleClick(e, item._doc.userName2)}
                          className={chatFriend == item._doc.userName2?"btn flex  hover:text-green-300 truncate justify-center md:w-[300px] p-1 px-1 rounded-2xl bg-blue-950 font-bold text-white ":"btn flex justify-center truncate hover:text-green-300 md:w-[300px] p-1 px-2 rounded-2xl bg-blue-900 text-white "
                          }
                          >{item._doc.userName2}{item.count && <span className='text-red-600 text-2xl font-bold'>
                            *</span>}</button>
                        </div>
                    ))}
                </div>
                <div className="body  w-full ">
                    <Chatbox sharedstate={sharedstate} setsharedstate={setsharedstate} chatFriend = {chatFriend}/>
                </div>
            </div>
        </div>
    );
}

export default Home;

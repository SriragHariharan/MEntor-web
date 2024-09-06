import React, { useEffect, useState, useRef } from 'react'
import { FaPaperPlane } from "react-icons/fa6";
import SidebarUser from '../components/chats/SidebarUser'
import ChatUserHeader from '../components/chats/ChatUserHeader'
import MyMessage from '../components/chats/MyMessage'
import OtherMessage from '../components/chats/OtherMessage'
import { axiosInstance } from '../helpers/axios'
import conversation from '../assets/images/Conversation-pana.png'


import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_DOMAIN_NAME);

function Chats() {
    const [following, setFollowing] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatID, setChatID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("")


    //enable smooth scrolling
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => scrollToBottom() , [messages]);
    
    //get the list of mentors I am following
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/following")
        .then(resp => setFollowing(resp.data.data.following))
        .catch(err => console.log(err))
    },[])

    //get chatS
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_CHAT_SVC_ENDPOINT + "/chats/"+ selectedChat?.userID)
        .then(resp => {
            //console.log("msg :::",resp.data?.data)
            setChatID(resp.data?.data?.chatID);
            setMessages(resp.data?.data?.messages);
            setUserID(resp.data?.data?.userID);
        })
        .catch(err => console.log(err))
    },[selectedChat])

    // Flag to ensure listeners are set only once
    const listenersSet = useRef(false);
    
    //join a specific room
    useEffect(() => {
        // Join the room when the component mounts
        socket.emit('joinRoom', chatID);

        if (!listenersSet.current) {
            // Listen for messages in the room
            socket.on('message', (message) => {
                setMessages((prevMessages) => [...prevMessages, { ...message, isRead: true }]);
            });

            // Set the flag to true to prevent adding listeners again
            listenersSet.current = true;
        }

        // Emit an event to mark messages as read
        socket.emit('markMessagesAsRead', chatID);

        socket.on('messagesMarkedAsRead', (chatID) => {
            setMessages((prevMessages) => prevMessages?.map((msg) => ({ ...msg, isRead: true })));
        });

        // Clean up
        return () => {
            socket.emit('leaveRoom', chatID);
            socket.off('message'); // Remove the 'message' event listener
            listenersSet.current = false; // Reset the flag
        };
    }, [chatID]);



    const handleSendMessage = () => {
        if(messageInput == "") return;
        socket.emit('sendMessage', { roomId:chatID, message: messageInput, senderID:userID, receiverID: selectedChat?.userID });
    }

    console.log(messages, "messages")

  return (
        <div class="container mx-auto">
            <div class="h-screen-85 lg:h-screen-95 flex lg:py-12">
                <div class="flex-col border border-grey rounded shadow-lg h-full hidden lg:flex">

                        {/* <!-- Search --> */}
                        <div class="py-2 px-2 bg-grey-lightest">
                            <input type="text" class="w-full px-2 py-2 text-sm" placeholder="Search or start new chat"/>
                        </div>

                        {/* <!-- Contacts --> */}
                        <div class="bg-grey-lighter overflow-auto flex-1">
                            {
                                following?.map(f => <SidebarUser key={f.username} details={f} setSelectedChat={setSelectedChat} /> )
                            }
                        </div>

                </div>


                {/* <!-- Right --> */}
                <div class="w-full lg:w-2/3 border flex flex-col">

                    {/* <!-- Header --> */}
                    {
                        (selectedChat !== null) && <ChatUserHeader selectedChat={selectedChat} />
                    }
                    

                    {/* <!-- Messages --> */}
                    <div class="flex-1 overflow-auto" style={{backgroundColor: "#DAD3CC"}}>
                        {
                            (messages?.length > 0) && (
                                <div class="py-2 px-3">
                                    {
                                        messages?.map(msg => (
                                            (userID === msg.senderID) ? <MyMessage msgObj={msg} /> : <OtherMessage msgObj={msg} />
                                        ))
                                    }
                                    <div ref={messageEndRef} />
                                </div>
                            )
                        }
                        {
                            (messages?.length === 0 || !messages) && (
                                <div class="py-2 px-3 text-center flex flex-col h-full justify-center items-center text-4xl text-blue-400">
                                    <img src={conversation} alt="no conversations png" className='opacity-80 w-96' />
                                    <div className='text-slate-400 text-2xl'>Start or select a conversation now...</div>
                                </div>
                            ) 
                        }
                    </div>

                    {/* <!-- Input --> */}
                    {
                        chatID && (
                            <div class="bg-grey-lighter px-4 py-4 flex items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                                </div>
                                <div class="flex-1 mx-4">
                                    <input class="w-full border rounded px-2 py-2" type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
                                </div>
                                <div onClick={handleSendMessage}>
                                    <FaPaperPlane className='text-xl text-slate-400 m-2 hover:text-green-500 cursor-pointer' />
                                </div>
                            </div>
                        )
                    }
                </div>

                </div>
        </div>
  )
}

export default React.memo(Chats)
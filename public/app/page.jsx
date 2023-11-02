"use client"
import styles from './page.module.css'
import { useEffect, useState , useRef } from 'react'
import axios from 'axios';
import { io } from "socket.io-client";
import { useRouter } from 'next/navigation'
import Contacts from './components/contact';
import { allUsersRoute ,host } from './utils/ApiRoutes';
import Welcome from './components/welcome';
import Chat_Container from './components/chat_container' ;



export default function Home() {
  const { push } = useRouter();
  const socket = useRef();
  const [contacts ,setContacts] = useState([]);
  const [currentUser ,setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading , setIsLoading] = useState(false)

  useEffect(()=>{
      const checkLocalStorage = async ()=>{
        if (!localStorage.getItem('chat-app-user')) {
          push("/Login");
        }else{
          setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
          setIsLoading(true);
        }
      }
      checkLocalStorage();
  },[])
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);

  useEffect(()=>{
    const fetchData = async ()=>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
            const {data}  = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data);
        }else{
          push("/setAvatar");
        }
      }
    };
    fetchData();
  },[currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
      <Contacts contacts={contacts} changeChat={handleChatChange} />
      {currentChat === undefined ? ( <Welcome />) : ( <Chat_Container currentChat ={currentChat} currentUser ={currentUser} socket={socket} /> ) }
      </div>
     
  </div>
  )
}

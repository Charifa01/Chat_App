import styles from '../page.module.css'
import { useEffect, useState ,useRef } from 'react'
import LogOut  from './Logout' ;
import ChatInput from './chatInput'
import axios from 'axios';
import {sendMessagesRoute} from '../utils/ApiRoutes'
import {getAllMessagesRoute } from '../utils/ApiRoutes'




export default function Chat_Container({currentChat,socket}){
      const [messages, setMessages] = useState([])
      const scrollRef = useRef();
      const [arrivalMessage, setArrivalMessage] = useState(null);

      useEffect(()=>{
        const getMessages = async ()=>{
          const data = await JSON.parse(localStorage.getItem('chat-app-user'));
          const response = await axios.post(getAllMessagesRoute, {
            from: data._id,
            to:  currentChat._id,
          });
          setMessages(response.data)
        }
        getMessages();
        
      },[currentChat])

        const handleSendMsj = async (msg)=>{
          const data = await JSON.parse(localStorage.getItem('chat-app-user'));
          socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            message : msg
          });
          await axios.post(sendMessagesRoute,{
            to: currentChat._id,
            from: data._id,
            message : msg
          })
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        }


        useEffect(() => {
          if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
              setArrivalMessage({ fromSelf: false, message: msg });
            });
          }
        }, []);

        useEffect(() => {
          arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
        }, [arrivalMessage]);

        useEffect(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);

    return(
        <div className={styles.chat_Container}>
            <div className={styles.chat_header}>
              <div className={styles.user_Details}>
                <div className={styles.avatar}>
                    <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt=""
                    />
                </div>
                <div className={styles.username}>
                    <h3>{currentChat.username}</h3>
                </div>
              </div>
              <LogOut />
            </div>
            <div className={styles.chat_messages}> 
            {
              messages.map((message)=>{
                return(
                  <div ref={scrollRef}>
                     <div className ={`${styles.message} ${message.fromSelf ? styles.sended : styles.recieved}`} >
                        <div className={styles.content}>
                          <p>
                          {message.message}
                          </p>
                        </div>
                     </div>
                  </div>
                )
              })
            }  
            </div>
            <ChatInput handleSendMsj={handleSendMsj} />
      </div>
       
    )
}
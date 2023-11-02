import styles from '../page.module.css'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function Welcome (){
    const { push } = useRouter();
    const [userName, setUserName] = useState("");
    useEffect(()=>{
        if (!localStorage.getItem('chat-app-user')) {
            push("/Login");
        }else{
            setUserName(JSON.parse(localStorage.getItem('chat-app-user')).username)
        }
    },[])
    return(
        <div className={styles.Welcome_container}>
            <img src="./images/robot.gif" alt="" />
            <h2> Welcome, <span>{userName}!</span></h2>
            <h4>Please select a chat to Start messaging.</h4>
        </div>
    )
}
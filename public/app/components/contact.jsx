import React, { useState, useEffect } from "react";
import styles from '../page.module.css'

export default function Contacts({contacts,changeChat}){

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(()=>{
    const getUser = async ()=>{
        const data = await JSON.parse(localStorage.getItem('chat-app-user'));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage)
    }
    getUser()
  },[])
  const changeCurrentChat = (indx, contact) => {
    setCurrentSelected(indx);
    changeChat(contact);
  };

    return(
       <>
       {currentUserName && currentUserImage && (
            <div className={styles.contact_Container} >
                <div className={styles.brand}>
                <img src="./images/logo.png" alt="logo" />
                <h3>LetsChat</h3>
              </div>
            <div className={styles.contacts}>
            {contacts.map((contact,index)=>{
                return(
                    <div key={contact._id} className={`${styles.contact} ${index === currentSelected ? styles.selected : ''} `} onClick = {() => changeCurrentChat(index, contact)} >
                        <div className={styles.avatar} >
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                        </div>
                        <div className={styles.username} >
                            <h3>{contact.username}</h3>
                        </div>
                    </div>
                )
            })}
            </div>
        <div className={styles.current_user}>
            <div className={styles.avatar}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className={styles.username}>
              <h3>{currentUserName}</h3>
            </div>
        </div>

        </div>
       )}
       </>
    )
}
import styles from '../page.module.css'
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { useState } from 'react'

export default function ChatInput({handleSendMsj}){
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerhideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (emojiObject, event) => {
        console.log(emojiObject.emoji)
        let message = msg;
        message += emojiObject.emoji ;
        setMsg(message);
      };
    const sendChat = (event)=>{
        event.preventDefault()
        if(msg.length > 0){
            handleSendMsj(msg)
            setMsg('')
        }
    }
    
    return(
        <div className={styles.ChatInput}>
            <div className={styles.emojiButton}>
                <div className={styles.emoji}>
                <BsEmojiSmileFill onClick = {handleEmojiPickerhideShow} />
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                }
                </div>
            </div>
            <form className={styles.input_container} onSubmit={(event) => sendChat(event)}>
                <input
                type="text"
                placeholder="type your message here"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                />
                <button type="submit">
                <IoMdSend />
                </button>
            </form>
        </div>
        
    )
}
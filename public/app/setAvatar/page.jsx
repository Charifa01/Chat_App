"use client"
import Link from 'next/link';
import styles from '../page.module.css'
import { useEffect, useState } from 'react'
import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/ApiRoutes';
import { useRouter } from 'next/navigation';
import { Buffer } from "buffer";

export default function setAvater(){
    const api = `https://api.multiavatar.com/4645646`;
    const { push } = useRouter();
    const [Avatars ,setAvatars] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [selectedAvatar , setSelectedAvatar] = useState(undefined);

    useEffect(() => {
        const checkUser = async () => {
          if (!localStorage.getItem('chat-app-user')) {
            push("/Login");
          }
        };
      
        checkUser();
      }, [push]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = Buffer.from(image.data);
                    data.push(buffer.toString("base64"));
                }
                console.log(data);
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
    
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar",{
                theme :'dark'
          });
        }else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {image: Avatars[selectedAvatar]});
            if (data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem('chat-app-user',JSON.stringify(user));
            push("/");
            } else {
            toast.error("Error setting avatar. Please try again.",{
                theme :'dark'
          });
          }
       }
    };


return(
    <>
    {isLoading ? (
      <div className={styles.Container}>
        <img src='./images/loader.gif' alt="loader" className= {styles.loader} />
      </div>
    ) : (
    <div className={styles.Container}>
        <div className={styles.titleContainer}>
          <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className={styles.avatars}>
          {Avatars.map((avatar, index) => {
            return (
                <div className={`${styles.avatar} ${selectedAvatar === index ? styles.selected : ""}`}>
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture} className={styles.submitBtn}>
          Set as Profile Picture
        </button>
        <ToastContainer />
    </div>
)}
  </>
)
}


import styles from '../page.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { BiPowerOff } from "react-icons/bi";

export default function LogOut(){
    const { push } = useRouter();
    const hundleClick = async()=>{
        localStorage.clear();
        push('/Login');
    }
    return(
        <button className={styles.logout} onClick={hundleClick}>
            <BiPowerOff />
        </button>
    )
}
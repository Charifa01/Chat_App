"use client"
import Link from 'next/link';
import styles from '../page.module.css'
import { useEffect, useState } from 'react'
import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';
import { useRouter } from 'next/navigation'



 export default function Login(){
    const { push } = useRouter();
     const [values,setValues] = useState({
       username:'',
       password:'',
     })
     useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            push('/');
        }
     },[])

     const handleChange = (event) => {
       setValues({ ...values, [event.target.name]: event.target.value });
     };
     const handleValidation = ()=>{
       const {username,password } = values;
       if(username.length === ''){
       toast.error('the username and password are required',{
         theme :'dark' 
       })
       return false;
     }
     else if(password === ''){
        toast.error('the username and password are required',{
            theme :'dark' 
          })
       return false;
     }
     return true;
   }
     const handleSubmit = async (event)=>{
       event.preventDefault();
       if(handleValidation()){
         const {username,password} = values;
         const {data} = await axios.post(loginRoute,{
           username,
           password
         })
         if(data.status === false){
          console.log('false')
           toast.error(data.msj,{
             theme :'dark'
           })
         }
         if(data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
            push('/')
         }
        
       }
   }
     return(
       <div className={styles.main} >
         <form onSubmit ={handleSubmit} >
         <div className ={styles.brand} >
           <img src="./images/logo.png" alt="Logo" />
           <h1>LetsChat</h1>
         </div>
         <input type="text" name="username" placeholder="please write your name" onChange={handleChange} />
         <input type="password" name="password" placeholder="please write your password" onChange={handleChange} />
         <button type="submit">Log in</button>
         <span>Don't have a count ? &nbsp; <Link href='/Register'>Sign up</Link> </span>
       </form>
       <ToastContainer />
       </div>
     )
 }
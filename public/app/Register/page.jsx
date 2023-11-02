"use client"
import Link from 'next/link';
import styles from '../page.module.css'
import { useEffect, useState } from 'react'
import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';
import { useRouter } from 'next/navigation'



 export default function Register(){
    const { push } = useRouter();
     const [values,setValues] = useState({
       username:'',
       email:'',
       password:'',
       confirmPassword:''
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
       const {username,email,password,confirmPassword} = values;
       if(username.length < 3){
       toast.error('the username must be greater than 3 characteres',{
         theme :'dark' 
       })
       return false;
     }
     else if(email ===''){
       toast.error('email is required !!',{
         theme :'dark' 
       })
       return false;
     }
     else if(password.length < 8){
       toast.error('the password should be egal or greater than 8',{
         theme :'dark' 
       })
       return false;
     }else if(password !== confirmPassword){
       toast.error('the password and the confirm password should be the same',{
         theme :'dark'
       })
       return false;
     }
     return true;
   }
     const handleSubmit = async (event)=>{
       event.preventDefault();
       if(handleValidation()){
         const {username,email,password,confirmPassword} = values;
         const {data} = await axios.post(registerRoute,{
           username,
           email,
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
         }
         push('/setAvatar')
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
         <input type="email" name="email" placeholder="please write your email" onChange={handleChange} />
         <input type="password" name="password" placeholder="please write your password" onChange={handleChange} />
         <input type="password" name="confirmPassword" placeholder="please confirm your password" onChange={handleChange} />
         <button type="submit">Create User</button>
         <span>Already have a count ? &nbsp; <Link href='/Login'>Login</Link> </span>
       </form>
       <ToastContainer />
       </div>
     )
 }
import { getAuth, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import app from "../Server/Firebase";
import Cookies from "js-cookie";
import { calculateSpace } from "./calculateSpace";
import { getFirestore } from "firebase/firestore";
import axios from 'axios'
import CryptoJS from 'crypto-js';

export const HandleSubmit=(email, password,setMessage, setSeverity,open, setOpen,rememberMe,handleClose,handleOpen,history)=>{
    handleOpen()
    const db = getFirestore(app);
    const add = ""
    if(!email||!password){
        setOpen(!open)
        setMessage("Fill all Fields")
        setSeverity("error")
        return handleClose()
    }
    const Auth = getAuth(app);
    signInWithEmailAndPassword(Auth,email,password)
    .then(async(userCredential)=>{
        const user = userCredential.user;
        console.log(user)
        if(rememberMe){
           Cookies.set('RememberMe',rememberMe,{expires:7})
           Cookies.set('Email',user.email,{expires:7})
           Cookies.set('Name',user.displayName,{expires:7})
           Cookies.set('AccessToken',user.refreshToken,{expires:7})
           Cookies.set('Uid',user.uid,{expires:7})

           const response = await axios.post('http://localhost:4000/sendEmail',{
                UserEmail:user.email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            localStorage.setItem('ciphertext',JSON.stringify( response.data.ciphertext))
           
            calculateSpace();
        }
        else{
            Cookies.set('RememberMe',rememberMe)
            Cookies.set('email',user.email)
            Cookies.set('Name',user.displayName)
            Cookies.set('AccessToken',user.refreshToken)
            Cookies.set('Uid',user.uid)

            
            const userEmail = user.email
           const response = await axios.post('http://localhost:4000/sendEmail',{
               UserEmail:userEmail.trim()
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            localStorage.setItem('ciphertext',JSON.stringify( response.data.ciphertext))
            calculateSpace();
        }
        //call the snack bar from context
        history(`/OTP/${replaceFirstFourLetters(user.email)}`);
        handleClose()
        setOpen(!open)
        setMessage("Login successfull")
        setSeverity("success") 
    })
    .catch((error) => {
        const errorCode = error.code;
        //call the snack bar from context
        handleClose()
        setOpen(!open)
        setMessage(errorCode)
        setSeverity("error")
      });
}

const replaceFirstFourLetters = (email) => {
    if (email.length < 4) {
      return email; // if email is shorter than 4 characters, return it as is
    }
    const replaced = '****' + email.slice(4);
    return replaced;
  };
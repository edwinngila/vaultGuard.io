import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Server/Firebase";
import Cookies from "js-cookie";
import { calculateSpace } from "./calculateSpace";

export const HandleSubmit=(email, password,setMessage, setSeverity,open, setOpen,rememberMe,handleClose,handleOpen,history)=>{
    handleOpen()
    if(!email||!password){
        setOpen(!open)
        setMessage("Fill all Fields")
        setSeverity("error")
        return handleClose()
    }
    console.log(email)
    const Auth = getAuth(app);
    signInWithEmailAndPassword(Auth,email,password)
    .then((userCredential)=>{
        const user = userCredential.user;
        if(rememberMe){
           Cookies.set('RememberMe',rememberMe,{expires:7})
           Cookies.set('Email',user.email,{expires:7})
           Cookies.set('Name',user.displayName,{expires:7})
           Cookies.set('AccessToken',user.refreshToken,{expires:7})
           Cookies.set('Uid',user.uid,{expires:7})
           calculateSpace();
           history("/HomePage")
        }
        else{
            Cookies.set('RememberMe',rememberMe)
            Cookies.set('email',user.email)
            Cookies.set('Name',user.displayName)
            Cookies.set('AccessToken',user.refreshToken)
            Cookies.set('Uid',user.uid)
            calculateSpace();
            history("/HomePage");
        }
        //call the snack bar from context
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
export default HandleSubmit;
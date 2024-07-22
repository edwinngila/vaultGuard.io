import { getAuth, signOut } from "firebase/auth";
import app from "../Server/Firebase";
import Cookies from "js-cookie";

const SignOut =(
    setOpen,
    open,
    setMessage,
    setSeverity,
    handleClose,
    handleOpen,
    history
)=>{
    const allCookies = Cookies.get();
    const auth = getAuth(app);
    handleOpen();
    signOut(auth).then(() => {
        
        Object.keys(allCookies).forEach(cookieName => {
            Cookies.remove(cookieName); // This removes the cookie with the given name
          });
          
        handleClose()
        setOpen(!open)
        setMessage("User logout successful")
        setSeverity("success")
        history("/Signin");
    }).catch((error) => {
        
        handleClose()
        setOpen(!open)
        setMessage(error.message)
        setSeverity("error")
    });
}
export default SignOut;
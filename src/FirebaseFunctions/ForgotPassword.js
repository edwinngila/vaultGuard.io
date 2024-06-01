import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../Server/Firebase";

const HandleSubmit=(email,handleClose,handleOpen,open, setOpen, setMessage, setSeverity, history)=>{
    handleOpen();
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        // ..
        handleClose()
        setOpen(!open)
        setMessage("Password reset email sent!")
        setSeverity("success")
        history("/Signin")
    })
    .catch((error) => {
        const errorMessage = error.message;
        // ..
        handleClose()
        setOpen(!open)
        setMessage(errorMessage)
        setSeverity("error")
    });

}
export default HandleSubmit;
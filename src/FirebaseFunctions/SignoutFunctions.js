import { getAuth, signOut } from "firebase/auth";
import app from "../Server/Firebase";

const SignOut =(
    setOpen,
    open,
    setMessage,
    setSeverity,
    handleClose,
    handleOpen,
    history
)=>{
    const auth = getAuth(app);
    handleOpen();
    signOut(auth).then(() => {

        handleClose()
        setOpen(!open)
        setMessage("User logout successful")
        setSeverity("success")
        history("/");
    }).catch((error) => {
        
        handleClose()
        setOpen(!open)
        setMessage(error.message)
        setSeverity("error")
    });
}
export default SignOut;

import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import app from "../Server/Firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// import { redirect, useNavigate } from "react-router-dom";

const AddUsers=(FirstName,SecondName,Email,Phone,UserID)=>{
    const firestore = getFirestore(app);
    const ref = collection(firestore,"USERS");

    let data={
        FirstName:FirstName,
        SecondName:SecondName,
        Email:Email,
        Phone:Phone,
        UserID:UserID
    }
    try {
        addDoc(ref,data);
        console.log("user has been added successfully")
    } catch (error) {
        console.log(error);
        console.log("error adding the user")
    }
}

const HandleSubmit=(
    FirstName,
    SecondName,
    email,
    Phone,
    Password,
    setMessage,
    setSeverity,
    open, 
    setOpen,
    handleClose,
    handleOpen,
    history
)=>{
    const Auth = getAuth(app)
    handleOpen();
    if(!FirstName||!SecondName||!email||!Password ||!Phone){
        handleClose()
        setOpen(!open)
        setMessage("Fill all Fields")
        setSeverity("error")
        return
    }
    createUserWithEmailAndPassword(Auth,email,Password)
    .then(async(userCredential)=>{
        const user = userCredential.user;
        const UserID = user.uid;
        if(!FirstName||!SecondName||!email){
            handleClose()
            setOpen(!open)
            setMessage("Fill all Fields")
            setSeverity("error")
            return 
        }
        const profileUpdates = {
            displayName: `${FirstName} ${SecondName}`,
            phoneNumber: `${Phone}`
          };
      
          try {
            await updateProfile(profileUpdates);
          } catch (error) {
            // Handle errors updating profile (optional)
            console.error("Error updating user profile:", error);
        }
        AddUsers(FirstName,SecondName,email,Phone,UserID)
        //call the snack bar from context
        handleClose()
        setOpen(!open)
        setMessage("User regestered successful")
        setSeverity("success")
        history("/Signin")
    })
    .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        //call the snack bar from context
        handleClose()
        setOpen(!open)
        setMessage(errorCode)
        setSeverity("error")
        console.log(errorCode,);
      });
}
export default HandleSubmit

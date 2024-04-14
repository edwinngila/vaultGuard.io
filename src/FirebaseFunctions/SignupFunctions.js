
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../Server/Firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const AddUsers=(FirstName,SecondName,Email,UserID)=>{
    const firestore = getFirestore(app);
    const ref = collection(firestore,"USERS");

    let data={
        FirstName:FirstName,
        SecondName:SecondName,
        Email:Email,
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
    Password,
    setMessage,
    setSeverity,
    open, 
    setOpen
)=>{
    const Auth = getAuth(app)
    createUserWithEmailAndPassword(Auth,email,Password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const UserID = user.uid;
        AddUsers(FirstName,SecondName,email,UserID)

        //call the snack bar from context
        setOpen(!open)
        setMessage("User regestered successful")
        setSeverity("success")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        //call the snack bar from context
        setOpen(!open)
        setMessage(errorCode)
        setSeverity("error")
        console.log(errorCode,);
      });
}
export default HandleSubmit
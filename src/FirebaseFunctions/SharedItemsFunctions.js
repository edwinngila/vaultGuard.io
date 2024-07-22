import { collection, getDocs, getFirestore } from "firebase/firestore"
import app from "../Server/Firebase";

export const getStarredItems=async()=>{
    const db = getFirestore(app);
    const usersRef = collection(db, "STARRED");
    const querySnapshot = await getDocs(usersRef);
    const lsFiles = [];
    querySnapshot.forEach((doc) => {
      lsFiles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    localStorage.setItem("Starred",JSON.stringify(lsFiles));
}
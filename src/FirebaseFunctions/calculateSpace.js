import Cookies from "js-cookie";
import app from "../Server/Firebase";
import { getStorage } from "firebase/storage";


export const calculateSpace=()=>{
    const storage = getStorage(app)
    const userId = Cookies.get("Uid")

}
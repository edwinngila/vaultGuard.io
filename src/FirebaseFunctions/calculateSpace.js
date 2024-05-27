import Cookies from "js-cookie";
import app from "../Server/Firebase";
import { getMetadata, getStorage, listAll, ref } from "firebase/storage";


export const calculateSpace= async()=>{
    const storage = getStorage(app)
    const userId = Cookies.get("Uid")
    const listRef = ref(storage, userId);
    const res = await listAll(listRef);
    const files = res.items;
    let total = 0;

    for (const file of files) {
        const metadata = await getMetadata(file);
        total = metadata.size + total
        console.log(total);
    }
    localStorage.setItem('spaceUsed',JSON.stringify(formatBytes(total)))
    localStorage.setItem('ProgressParsecent',JSON.stringify(bytesToMegabytes(total)))
}
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
const bytesToMegabytes=(bytes)=>{
    const Megabytes = bytes / 1024 / 1024;
    const Gigabyte = Megabytes / 1024;
    const parsecent = Gigabyte * 100;
    return parsecent.toFixed(2);
  }
  
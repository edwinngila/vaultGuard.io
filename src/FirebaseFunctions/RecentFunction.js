import { getDownloadURL, getMetadata, getStorage, listAll, ref } from "firebase/storage";
import Cookies from "js-cookie";
import app from "../Server/Firebase";

export const ListDirectories = async () => {
    try {
      const lsFiles=[];
      const storage = getStorage(app)
      const userId = Cookies.get("Uid")
      const listRef = ref(storage, userId);
      const res = await listAll(listRef);
  
      const files = res.items;
      const folders = res.prefixes;

      for (const folder of folders) {
        const listRef = ref(storage, `${userId}/${folder.name}`);
        const res = await listAll(listRef);
        const files2 = res.items;
        
        for (const file of files2) {
            const url = await getDownloadURL(file);
            const metadata = await getMetadata(file);
            const formattedSize = formatBytes(metadata.size);
            const formattedDate = formatDate(metadata.timeCreated);
            lsFiles.push({name:file.name, URL:url,size: formattedSize,date:formattedDate});
        }
       
    }
  
      for (const file of files) {
            const url = await getDownloadURL(file);
            const metadata = await getMetadata(file);
            const formattedSize = formatBytes(metadata.size);
            const formattedDate = formatDate(metadata.timeCreated);
            lsFiles.push({name:file.name, URL:url,size: formattedSize,date:formattedDate});
      }
  
      localStorage.setItem("files",JSON.stringify(lsFiles));
  
    } catch (error) {
      console.log(error)
    }
  }

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
}
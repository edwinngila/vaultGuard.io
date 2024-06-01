import { getMetadata, getStorage, listAll, ref } from "firebase/storage";
import app from "../Server/Firebase";
import Cookies from "js-cookie";

export const ListMyDrives = async () => {
    try {
      const storage = getStorage(app)
      const userId = Cookies.get("Uid")
      const lsFiles=[];
      const listRef = ref(storage, userId);
      const res = await listAll(listRef);

      const folders = res.prefixes;
  
      for (const folder of folders) {
        const listRef = ref(storage, `${userId}/${folder.name}`);
        const res = await listAll(listRef);
        const files = res.items;
        let size =0;
        for (const file of files) {
            const fileSnapshot = await getMetadata(file);
            size+=fileSnapshot.size;
        }
        lsFiles.push({name:folder.name,size:formatBytes(size)});
      }

      console.log(lsFiles);
  
      localStorage.setItem("MyDrives",JSON.stringify(lsFiles));
  
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

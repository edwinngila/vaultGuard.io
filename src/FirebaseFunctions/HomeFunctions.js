import { deleteObject, getDownloadURL, getMetadata, getStorage, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import app from "../Server/Firebase";
import Cookies from "js-cookie";
import FolderIcon from '@mui/icons-material/Folder';
import { addDoc, collection, getFirestore } from "firebase/firestore";

// import { addDoc, collection, getFirestore } from "firebase/firestore";
// import CryptoJS from 'crypto-js';

// const Ecryption =(file)=>{
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileContent = e.target.result;

//       // Encrypt the file content
//       const encrypted = CryptoJS.AES.encrypt(
//         CryptoJS.lib.WordArray.create(fileContent),
//         "secretKey"
//       ).toString();

//       // Store the encrypted content
//       console.log(encrypted);
//       Decryption(encrypted.toString());
//     };

//     // Read the file as an ArrayBuffer
//     reader.readAsArrayBuffer(file);
//   }
// }

// const Decryption =(file)=>{
//   var bytes  = CryptoJS.AES.decrypt(file, 'secretKey');
//   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   console.log(decryptedData); 
// }

export const newFolderAction=(newFolder,open, setOpen, setMessage, setSeverity,handleClose,handleOpen,history)=>{
    handleOpen()
    const storage =getStorage(app)
    const userId = Cookies.get("Uid")
   
    const placeholderFileName = '.empty'; 
    const placeholderContent = '';
    const folderRef = ref(storage,`${userId}/${newFolder}/${placeholderFileName}`);
    uploadString(folderRef, placeholderContent)
    .then(() => {
      handleClose();
      setOpen(!open);
      setMessage("New folder created successfully.");
      setSeverity("success");
      history(0);
    })
    .catch((error) => {
      handleClose();
      setOpen(!open)
      setMessage(`Error creating empty new folder:${error}`)
      setSeverity("error")
    });
};

export const UploadFileAction=(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen,history)=>{
    handleOpen()
    const allowedTypes =["audio/", "image/", "text/"];
    const fileType = File.type;
    const storage =getStorage(app)
    const userId = Cookies.get("Uid")
    if (!allowedTypes.some(type => fileType.startsWith(type))) {
        File.value = "";
        handleClose()
        setOpen(!open)
        setMessage("Wrong file type. Please select a image file.")
        setSeverity("error")
        return
    }
    const fileRef = ref(storage,`${userId}/${File.name}`);
    getDownloadURL(fileRef)
    .then((url) => {
      handleClose();
      setOpen(!open);
      setMessage("A file with the same name already exists. Please change the file name.");
      setSeverity("error");
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') { 
        // Ecryption(File)
        uploadBytes(fileRef, File)
          .then((url) => {
            handleClose();
            setOpen(!open);
            setMessage("Image uploaded successfully.");
            setSeverity("success");
            history(0)
          })
          .catch((uploadError) => {
            handleClose();
            setOpen(!open);
            setMessage(`Error uploading image: ${uploadError}`);
            setSeverity("error");
          });
      } else {
        handleClose();
        setOpen(!open);
        setMessage(`Error: ${error}`);
        setSeverity("error");
      }
    });
};

export const UploadAudioAction=(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen,history)=>{
    handleOpen()
    const allowedTypes ="audio/";
    const fileType = File.type;
    const storage =getStorage(app)
    const userId = Cookies.get("Uid")
    if (!fileType.startsWith(allowedTypes)) {
        File.value = "";
        handleClose()
        setOpen(!open)
        setMessage("Wrong file type. Please select an audio file.")
        setSeverity("error")
        return
      }
      const fileRef = ref(storage,`${userId}/audio/${File.name}`);
      getDownloadURL(fileRef)
      .then((url) => {
        handleClose();
        setOpen(!open);
        setMessage("A file with the same name already exists. Please change the file name.");
        setSeverity("error");
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          // File does not exist, proceed with upload
          uploadBytes(fileRef, File)
            .then(() => {
              handleClose();
              setOpen(!open);
              setMessage("Image uploaded successfully.");
              setSeverity("success");
              history(0)
            })
            .catch((uploadError) => {
              handleClose();
              setOpen(!open);
              setMessage(`Error uploading image: ${uploadError}`);
              setSeverity("error");
            });
        } else {
          handleClose();
          setOpen(!open);
          setMessage(`Error: ${error}`);
          setSeverity("error");
        }
      });

};

export const UploadImageAction=async(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen,history)=>{
    handleOpen()
    const allowedTypes ="image/";
    const fileType = File.type;
    const storage =getStorage(app)
    const userId = Cookies.get("Uid")
    console.log(File)
    if (!fileType.startsWith(allowedTypes)) {
        File.value = "";
        handleClose()
        setOpen(!open)
        setMessage("Wrong file type. Please select a image file.")
        setSeverity("error")
        return
      }
      const fileRef = ref(storage,`${userId}/images/${File.name}`);
      getDownloadURL(fileRef)
      .then((url) => {
        handleClose();
        setOpen(!open);
        setMessage("A file with the same name already exists. Please change the file name.");
        setSeverity("error");
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          uploadBytes(fileRef, File)
            .then(() => {
              handleClose();
              setOpen(!open);
              setMessage("Image uploaded successfully.");
              setSeverity("success");
              history(0)
            })
            .catch((uploadError) => {
              handleClose();
              setOpen(!open);
              setMessage(`Error uploading image: ${uploadError}`);
              setSeverity("error");
            });
        } else {
          handleClose();
          setOpen(!open);
          setMessage(`Error: ${error}`);
          setSeverity("error");
        }
      });

};

export const UploadPDFAction=(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen,history)=>{
    handleOpen()
    const fileType = File.type;
    const storage =getStorage(app)
    const userId = Cookies.get("Uid")
    if (!fileType.startsWith("application/pdf") && !fileType.startsWith("image/")) {
        File.value = "";
        handleClose()
        setOpen(!open)
        setMessage("Wrong file type. Please select a pdf file.")
        setSeverity("error")
        return
      }
      const fileRef = ref(storage,`${userId}/pdf/${File.name}`);
      getDownloadURL(fileRef)
      .then((url) => {
        handleClose();
        setOpen(!open);
        setMessage("A file with the same name already exists. Please change the file name.");
        setSeverity("error");
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          uploadBytes(fileRef, File)
            .then(() => {
              handleClose();
              setOpen(!open);
              setMessage("Image uploaded successfully.");
              setSeverity("success");
              history(0)
            })
            .catch((uploadError) => {
              handleClose();
              setOpen(!open);
              setMessage(`Error uploading image: ${uploadError}`);
              setSeverity("error");
            });
        } else {
          handleClose();
          setOpen(!open);
          setMessage(`Error: ${error}`);
          setSeverity("error");
        }
      });
};

export const ListDirectories = async () => {
  try {
    const lsFiles=[];
    const storage = getStorage(app)
    const userId = Cookies.get("Uid")
    const listRef = ref(storage, userId);
    const res = await listAll(listRef);

    const files = res.items;
    const folders = res.prefixes;
    getMetadata(listRef)
    .then((metadata) => {
      console.log(metadata)
    })
    .catch((error) => {
      console.log(error)
    });

    for (const folder of folders) {
      lsFiles.push({name:folder.name})
    }

    for (const file of files) {
      const url = await getDownloadURL(file);
      const metadata = await getMetadata(file);
      const formattedSize = formatBytes(metadata.size);
      const formattedDate = formatDate(metadata.timeCreated);
      lsFiles.push({name:file.name, URL:url,size: formattedSize,date:formattedDate});
      console.log(metadata)
    }
    console.log(lsFiles);

    localStorage.setItem("files",JSON.stringify(lsFiles));

  } catch (error) {
    console.log(error)
  }
}

export const DownloadFile=()=>{
    const storage = getStorage(app)
    const userId = Cookies.get("Uid")
    const listRef = ref(storage, userId);
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
export const DeleteFile =(fileName)=>{
  const storage =getStorage(app);
  const userId = Cookies.get("Uid");
  var fileRef = ref(storage,`${userId}/${fileName}`);
  // Delete the file
  deleteObject(fileRef).then(() => {
    console.log("File deleted successfully")
  }).catch((error) => {
    console.log("Uh-oh, an error occurred!")
  });
}
export const NavigateFolders =async(path)=>{
  const lsFiles=[];
  const storage = getStorage(app)
  const userId = Cookies.get("Uid")
  const listRef = ref(storage,`${userId}/${path}`);
  const res = await listAll(listRef);
  const files = res.items;

  for (const file of files) {
    const url = await getDownloadURL(file);
    const metadata = await getMetadata(file);
    const formattedSize = formatBytes(metadata.size);
    const formattedDate = formatDate(metadata.timeCreated);
    lsFiles.push({name:file.name, URL:url,size: formattedSize,date:formattedDate});
  }
  localStorage.setItem("subFiles",JSON.stringify(lsFiles));

}

// Get the size of a folder
async function getFolderSize(folderPath) {
  try {
    const storage = getStorage(app)
    const folderRef = storage.child(folderPath);
    const files = await folderRef.listAll();
    let totalSize = 0;

    for (const file of files.items) {
      const fileSnapshot = await file.getMetadata();
      totalSize += fileSnapshot.size;
    }

    return totalSize;
  } catch (error) {
    console.error('Error getting folder size:', error);
    throw error;
  }
}

export const storeStaredItems=(nameFile,fileURL,size,dateCreated)=>{
  const firestore = getFirestore(app);
    const ref = collection(firestore,"STARRED");

    let data={
      nameFile:nameFile,
      fileURL:fileURL,
      size:size,
      dateCreated:dateCreated
    }
    try {
        addDoc(ref,data);
        console.log("user has been added successfully")
    } catch (error) {
        console.log(error);
        console.log("error adding the user")
    }
}

// Example usage
const runFanction=()=>{
  const userId = Cookies.get("Uid");
  getFolderSize(userId)
    .then((size) => {
      console.log(`Folder size: ${size} bytes`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
runFanction();
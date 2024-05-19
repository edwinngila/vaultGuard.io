import { getDownloadURL, getStorage, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import app from "../Server/Firebase";
import Cookies from "js-cookie";

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

export const newFolderAction=(newFolder,open, setOpen, setMessage, setSeverity,handleClose,handleOpen)=>{
    handleOpen()
    const storage =getStorage(app)
    const userId = Cookies.get("Uid")
   
    const placeholderFileName = '.empty'; 
    const placeholderContent = '';
    const folderRef = ref(storage,`${userId}/${newFolder}/${placeholderFileName}`);
    uploadString(folderRef, placeholderContent)
    .then(() => {
      handleClose()
      setOpen(!open)
      setMessage("New folder created successfully.")
      setSeverity("success")
    })
    .catch((error) => {
      handleClose()
      setOpen(!open)
      setMessage(`Error creating empty new folder:${error}`)
      setSeverity("error")
    });
};

export const UploadFileAction=(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen)=>{
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

export const UploadAudioAction=(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen)=>{
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

export const UploadImageAction=async(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen)=>{
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

export const UploadPDFAction=(File,open, setOpen, setMessage, setSeverity,handleClose,handleOpen)=>{
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

    for (const folder of folders) {
      lsFiles.push({name:folder.name})
    }

    for (const file of files) {
      const url = await getDownloadURL(file);
      lsFiles.push({name:file.name, URL:url});
    }

    localStorage.setItem("files",JSON.stringify(lsFiles));

  } catch (error) {
    console.log(error)
  }
}



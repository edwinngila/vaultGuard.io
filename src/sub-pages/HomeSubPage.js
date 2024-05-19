import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FolderIcon from '@mui/icons-material/Folder';
import StarIcon from '@mui/icons-material/Star';
import { useContext, useEffect, useState } from "react";
import { ListDirectories } from "../FirebaseFunctions/HomeFunctions";
import { Progress } from "../UseContext/ScreenLoader";

const HomeSubPage =()=>{
    const{handleClose,handleOpen}=useContext(Progress);
    const [files,setFiles]=useState([]);

    const handleDownload = () => {
        // Logic to generate or fetch the file to be downloaded
    
        // Example: Generating a text file
        const content = 'This is the content of the file.';
        const fileBlob = new Blob([content], { type: 'text/plain' });
        const fileUrl = URL.createObjectURL(fileBlob);
    
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'example.txt';
    
        // Simulate a click on the link to trigger the download
        link.click();
    
        // Clean up the temporary link
        URL.revokeObjectURL(fileUrl);
      };

    useEffect(
        ()=>{
            handleOpen();
            const fetchData = async () => {
                try {
                  await ListDirectories();
                  const localStorageFiles = JSON.parse(localStorage.getItem('files'));

                  setFiles(localStorageFiles);

                  console.log(files);
                  handleClose()
                } catch (error) {
                  console.error(error);
                  handleClose();
                }
              };
              fetchData();
    },[])
    const Columns=[
        {
            name:"Name",
            selector: row=>row.name,
            sortable:true
        },
        {
            name:"Action",
            selector: row=>
                          <div>
                              <span style={{cursor:"pointer"}} className="m-1"><DeleteIcon/></span>
                              <span style={{cursor:"pointer"}} className="m-1"><StarIcon/></span>
                              <span style={{cursor:"pointer"}} className="m-1"><SaveAltIcon/></span>
                          </div>,
            width:"300px",
            sortable:true
        },
    ];
    const myStyle={
        rows:{
            style:{
                backgroundColor:"#EDF5E1"
            }
        },
        headRow: {
            style: {
                backgroundColor:"#EDF5E1"
            }
        },
        cells: {
            style: {
               width:"50px"
            },
        }
    }
    return(
            <DataTable
               className="mt-3"
               columns={Columns}
               data={files}
               customStyles={myStyle}
               pagination
               fixedHeader
            ></DataTable>
    )
}
export default HomeSubPage;
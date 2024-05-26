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

    const DownloadImage= async(url,name)=>{
        const link = document.createElement("a");
        link.href=url;
        link.download=name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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
            name:"size",
            selector: row=>row.size,
            sortable:true,
            width:"150px",
        },
        {
            name:"Date created",
            selector: row=>row.date,
            sortable:true
        },
        {
            name:"Action",
            selector: row=>
                          <div>
                              <span style={{cursor:"pointer"}} className="m-1"><DeleteIcon/></span>
                              <span style={{cursor:"pointer"}} className="m-1"><StarIcon/></span>
                              <span onClick={()=>{DownloadImage(row.URL,row.name)}} style={{cursor:"pointer"}} className="m-1"><SaveAltIcon/></span>
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
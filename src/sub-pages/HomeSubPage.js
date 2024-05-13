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
    const [files,setFiles]=useState([])

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
            selector:()=>{
                     <p>
                         <SaveAltIcon/>
                         <DeleteIcon color="error"/>
                         <PersonAddAltIcon style={{color:"#379683"}}/>
                         <StarIcon/>
                    </p>
            },
            sortable:true
        }
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
        }
    }
    return(
            <DataTable
               className="mt-3"
               columns={Columns}
               data={files}
               customStyles={myStyle}
            ></DataTable>
    )
}
export default HomeSubPage;
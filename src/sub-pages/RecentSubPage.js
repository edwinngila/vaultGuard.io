import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FolderIcon from '@mui/icons-material/Folder';
import StarIcon from '@mui/icons-material/Star';
import { useContext, useEffect, useState } from "react";
import { DeleteFile } from "../FirebaseFunctions/HomeFunctions";
import { Progress } from "../UseContext/ScreenLoader";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ListDirectories } from "../FirebaseFunctions/RecentFunction";

const RecentSubPage =()=>{
    const{handleClose,handleOpen}=useContext(Progress);
    const [files,setFiles]=useState([]);
    const history=useNavigate();

    const handleDownload = (fileData,fileName) => {
        if (fileData) {
            const fileUrl = window.URL.createObjectURL(fileData);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(fileUrl);
            document.body.removeChild(link);
          }
    };

    const handleRowClick = (row) => {
        history("Recent");
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
                              <span onClick={()=>{DeleteFile(row.name)}} style={{cursor:"pointer"}} className="m-1"><DeleteIcon/></span>
                              <span style={{cursor:"pointer"}} className="m-1"><StarIcon/></span>
                              <span onClick={()=>{handleDownload(row.URL,row.name)}} style={{cursor:"pointer"}} className="m-1"><SaveAltIcon/></span>
                              <span onClick={()=>{history(`ViewFolder/${row.name}`)}} style={{cursor:"pointer"}} className="m-1"><ArrowForwardIcon/></span>
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
               onRowClick={handleRowClick}
            ></DataTable>
    )
}
export default RecentSubPage;
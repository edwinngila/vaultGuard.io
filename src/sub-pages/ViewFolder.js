import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import DataTable from "react-data-table-component";
import { Progress } from "../UseContext/ScreenLoader";
import { DeleteFile, NavigateFolders } from "../FirebaseFunctions/HomeFunctions";
import { useParams } from "react-router-dom";
import { SnackTost } from "../UseContext/Hook";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

const ViewFolder =()=>{
    const [files,setFiles]=useState([]);
    const{handleClose,handleOpen}=useContext(Progress);
    const { items } = useParams();
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
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
    useEffect(
        ()=>{
            handleOpen();
            const fetchData = async () => {
                try {
                  await NavigateFolders(items);
                  const localStorageFiles = JSON.parse(localStorage.getItem('subFiles'));

                  setFiles(localStorageFiles);
                  handleClose()
                } catch (error) {
                    handleClose();
                    setOpen(!open)
                    setMessage("Wrong file type. Please select a image file.")
                    setSeverity("error")                 
                }
              };
              fetchData();
    },[])
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
                          </div>,
            width:"300px",
            sortable:true
        },
    ];
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
export default ViewFolder;
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import { Progress } from "../UseContext/ScreenLoader";
import { useNavigate } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import { SnackTost } from "../UseContext/Hook";

const ShareSubPage =()=>{
    const{handleClose,handleOpen}=useContext(Progress);
    const [files,setFiles]=useState([]);
    const history=useNavigate();
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);

    const handleRowClick = (row) => {
        history("Recent");
      };

    useEffect(
        ()=>{
            handleOpen();
            const fetchData = async () => {
                try {
                //   await ListDirectories();
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
                              <span onClick={
                                ()=>{
                                    navigator.clipboard.writeText(row.URL)
                                    setOpen(!open)
                                    setMessage("Link copied successful")
                                    setSeverity("success")
                                }} style={{cursor:"pointer"}} className="m-1"><ShareIcon/></span>
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
export default ShareSubPage;
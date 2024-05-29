import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import DataTable from "react-data-table-component";
import { Progress } from "../UseContext/ScreenLoader";
import { NavigateFolders } from "../FirebaseFunctions/HomeFunctions";
import { useParams } from "react-router-dom";

const ViewFolder =()=>{
    const [files,setFiles]=useState([]);
    const{handleClose,handleOpen}=useContext(Progress);
    const { items } = useParams();
    useEffect(
        ()=>{
            handleOpen();
            const fetchData = async () => {
                try {
                  await NavigateFolders(items);
                  const localStorageFiles = JSON.parse(localStorage.getItem('subFiles'));

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
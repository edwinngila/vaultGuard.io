import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FolderIcon from '@mui/icons-material/Folder';
import StarIcon from '@mui/icons-material/Star';

const HomeSubPage =()=>{
    const Columns=[
        {
            name:"Name",
            selector: row=>row.id,
            sortable:true
        },
        {
            name:"Date added",
            selector: row=>row.name,
            sortable:true
        },
        {
            name:"File size",
            selector: row=>row.contacts,
            sortable:true
        },
        {
            name:"Action",
            selector: row=>row.Action,
            sortable:true
        }
    ];
    const data=[
        {
            id:1,
            name:<p><FolderIcon/> Susma Suppliers</p>,
            contacts:"0704922743",
            Action:<p>
                    <SaveAltIcon/>
                    <DeleteIcon color="error"/>
                    <PersonAddAltIcon style={{color:"#379683"}}/>
                    <StarIcon/>
                </p>
        },
        {
            id:1,
            name:<p><FolderIcon/> Susma Suppliers</p>,
            contacts:"0704922743",
            Action:<p>
                    <SaveAltIcon/>
                    <DeleteIcon color="error"/>
                    <PersonAddAltIcon style={{color:"#379683"}}/>
                    <StarIcon/>
                  </p>
        },
        {
            id:1,
            name:<p><FolderIcon/> Susma Suppliers</p>,
            contacts:"0704922743",
            Action:<p>
                    <SaveAltIcon/>
                    <DeleteIcon color="error"/>
                    <PersonAddAltIcon style={{color:"#379683"}}/>
                    <StarIcon/>
                </p>
        },
        {
            id:1,
            name:<p><FolderIcon/> Susma Suppliers</p>,
            contacts:"0704922743",
            Action:<p>
                     <SaveAltIcon/>
                     <DeleteIcon color="error"/>
                     <PersonAddAltIcon style={{color:"#379683"}}/>
                     <StarIcon/>
                    </p>
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
        }
    }
    return(
        <Container fluid>
            <DataTable
               className="mt-3"
               columns={Columns}
               data={data}
               customStyles={myStyle}
            ></DataTable>
        </Container>
    )
}
export default HomeSubPage;
import { Container } from "react-bootstrap"
import DataTable from "react-data-table-component";

const ViewFolder =()=>{
    const [files,setFiles]=useState([]);
    const Columns=[
        {
            name:"Name",
            selector: row=>row.name,
            sortable:true
        },
        {
            name:"Url",
            selector: row=>row.URL,
            sortable:true
        },
    ];
    return(
        <Container>
              <DataTable
                className="mt-3"
                columns={Columns}
                data={files}
                customStyles={myStyle}
                pagination
                fixedHeader
            ></DataTable>
        </Container>
    )
}
export default ViewFolder;
import { Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import WebLogo from "../Img/Vault Guard (1).svg"
import {Avatar, Breadcrumbs, Button, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, Menu, TextField, Typography, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useState} from "react";
import { SnackTost } from "../UseContext/Hook";
import SignOut from "../FirebaseFunctions/SignoutFunctions";
import { Progress } from "../UseContext/ScreenLoader";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DataTable from "react-data-table-component";

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const HomePage=()=>{
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();
    const [OpenMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClose = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(false);
    };

    const handleMenuOpen = () => {
        setOpenMenu(true);
        setAnchorEl(null);
    };
    const RoundedTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
          backgroundColor:"#E9EEF6",

          '&.Mui-focused fieldset': {
            borderColor: '#E9EEF6',
          },
        },
      });
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
            name:"Susma Suppliers",
            contacts:"0704922743",
            Action:<p><SaveAltIcon/><DeleteIcon/><PersonAddAltIcon/></p>
        },
        {
            id:1,
            name:"Susma Suppliers",
            contacts:"0704922743",
            Action:<p><SaveAltIcon/><DeleteIcon/><PersonAddAltIcon/></p>
        },
        {
            id:1,
            name:"Susma Suppliers",
            contacts:"0704922743",
            Action:<p><SaveAltIcon/> <DeleteIcon/><PersonAddAltIcon/></p>
        },
        {
            id:1,
            name:"Susma Suppliers",
            contacts:"0704922743",
            Action:<p><SaveAltIcon/><DeleteIcon/><PersonAddAltIcon/></p>
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
        <Container style={{overflowX:"hidden"}} fluid>
           <div style={{height:"100vh"}} className="row">
                <div style={{backgroundColor:"#86D5A7"}} className="col-2">
                    <img width={180} src={WebLogo} alt="img"></img>
                    <div>
                    <Button onClick={(event)=>{handleMenuOpen(event)}} style={{background:"#379683"}} className="mt-4 p-4 rounded-4" startIcon={<AddIcon />} variant="contained">New</Button>
                    <Menu
                       id="basic-menu"
                       anchorEl={anchorEl}
                       open={OpenMenu}
                       onClose={handleMenuClose}
                       anchorOrigin={{ horizontal: 'left', vertical: 'center' }} 
                       transformOrigin={{ horizontal: 'center', vertical: 'top' }} 
                       MenuListProps={{
                         'aria-labelledby': 'basic-button',
                       }}
                    >
                        <List>
                            <ListItemButton>
                                <ListItemIcon>
                                  <FolderIcon/>
                                </ListItemIcon>
                               <ListItemText primary="New folder"/>
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                  <UploadFileIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload file"/>
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                  <AudioFileIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload Audio"/>
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                  <InsertPhotoIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload Image"/>
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                  <PictureAsPdfIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload PDF"/>
                            </ListItemButton>
                        </List>
                    </Menu>
                    </div>
                    <List className="p-0 mt-2">
                        <ListItemButton style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <HomeIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Home"/>
                        </ListItemButton>

                        <ListItemButton style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <LibraryBooksIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="My Drive"/>
                        </ListItemButton>
                    </List>

                    <List className="mt-3">
                       <ListItemButton style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <ShareIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Share item"/>
                        </ListItemButton>
                        
                       <ListItemButton style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <AccessTimeFilledIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Recent"/>
                        </ListItemButton>

                       <ListItemButton style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <StarIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Starred"/>
                        </ListItemButton>
                    </List>

                    <List className="mt-3">
                       <ListItemButton style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon> 
                               <CloudIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Starred"/>
                        </ListItemButton>

                       <ListItemButton onClick={()=>{SignOut(setOpen,open,setMessage,setSeverity,handleClose,handleOpen,history)}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon> 
                               <LogoutIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Logout"/>
                        </ListItemButton>
                    </List>
                </div>
                <div style={{backgroundColor:"#86D5A7"}}  className="col-10">  
                    <div style={{backgroundColor:"#86D5A7"}} className="row p-2">
                         <div className="col-8">
                          <RoundedTextField
                            fullWidth
                            placeholder="Search in Drive"
                            id="rounded"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                              }}
                          />
                         </div>
                         <div className="col-4 d-flex justify-content-end align-content-end">
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                         </div>
                    </div>
                    <SimpleBar className="rounded-top-4" style={{ height: "89vh",backgroundColor:"#EDF5E1",overflowX:"hidden"}}>
                           <div className="row p-3">
                             <div className="col-6">
                                <h2 style={{fontWeight:"normal"}}>Welcome to vault</h2>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/">
                                        MUI
                                    </Link>
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        href="/material-ui/getting-started/installation/"
                                    >
                                        Core
                                    </Link>
                                    <Typography color="text.primary">Breadcrumbs</Typography>
                                </Breadcrumbs>
                             </div>
                           </div>
                           <div className="row">
                           <DataTable
                                className="mt-3 p-1"
                                columns={Columns}
                                data={data}
                                customStyles={myStyle}
                            ></DataTable>
                           </div>
                    </SimpleBar>
                </div>
           </div>
        </Container>
    );
}
export default HomePage;
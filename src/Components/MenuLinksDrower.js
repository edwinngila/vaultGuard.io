import WebLogo from "../Img/VaultGuard_.png"
import { Button, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Menu, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container } from "react-bootstrap";
import FolderIcon from '@mui/icons-material/Folder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { SnackTost } from "../UseContext/Hook";
import SignOut from "../FirebaseFunctions/SignoutFunctions";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "../UseContext/ScreenLoader";
import { UploadAudioAction, UploadFileAction, UploadImageAction, UploadPDFAction } from "../FirebaseFunctions/HomeFunctions";

export const MenuLinksDrower=()=>{
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen,handleDialogOpen}=useContext(Progress);
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
      const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    return(
           <div className="col-10 ps-3">
           <div className="row">
                    <div className="row">
                        <img width={"70px"} height={"96xp"} src={WebLogo} alt="img"></img>
                    </div>
                     <div>
                    <Button
                     style={{background:"#379683"}} 
                     className="mt-3 p-4 rounded-4" 
                     startIcon={<AddIcon />} 
                     variant="contained"

                     id="basic-button"
                     aria-controls={OpenMenu ? 'basic-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={OpenMenu ? 'true' : undefined}
                     onClick={(event)=>{handleMenuOpen(event)}}
                     >New
                     </Button>
                    <Menu
                       id="basic-menu"
                       className="mt-5"
                       anchorEl={anchorEl}
                       open={OpenMenu}
                       onClose={handleMenuClose}
                       anchorOrigin={{ horizontal: 'left', vertical: 'top' }} 
                       transformOrigin={{ horizontal: 'left', vertical: 'top' }} 
                       MenuListProps={{
                         'aria-labelledby': 'basic-button',
                       }}
                    >
                        <List>
                            <ListItemButton onClick={
                                (e)=>
                                    {
                                        handleDialogOpen();
                                        handleMenuClose(e)
                                    }
                                }>
                                <ListItemIcon>
                                  <FolderIcon/>
                                </ListItemIcon>
                               <ListItemText primary="New folder"/>
                            </ListItemButton>

                            <ListItemButton className="col-12" component="label">
                                 <ListItemIcon>
                                    <UploadFileIcon/>
                                  </ListItemIcon>
                                <ListItemText primary="Upload file"/>                                 
                                <VisuallyHiddenInput onChange={
                                  (e)=>{
                                    setOpenMenu(false);
                                    UploadFileAction(e.target.files[0],open, setOpen, setMessage, setSeverity,handleClose,handleOpen)
                                  }} type="file" accept="audio/*, image/*, text/*"/>
                            </ListItemButton>

                            <ListItemButton component="label" >
                                <ListItemIcon>
                                  <AudioFileIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload Audio"/>
                               <VisuallyHiddenInput onChange={
                                (e)=>{
                                  setOpenMenu(false);
                                  UploadAudioAction(e.target.files[0],open, setOpen, setMessage, setSeverity,handleClose,handleOpen)
                               }} type="file" accept="audio/*" />
                            </ListItemButton>

                            <ListItemButton component="label">
                                <ListItemIcon>
                                  <InsertPhotoIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload Image"/>
                               <VisuallyHiddenInput onChange={
                                (e)=>{
                                  setOpenMenu(false);
                                  UploadImageAction(e.target.files[0],open, setOpen, setMessage, setSeverity,handleClose,handleOpen)
                                }} type="file" accept="image/*" />
                            </ListItemButton>

                            <ListItemButton component="label">
                                <ListItemIcon>
                                  <PictureAsPdfIcon/>
                                </ListItemIcon>
                               <ListItemText primary="Upload PDF"/>
                               <VisuallyHiddenInput onChange={
                                (e)=>{
                                  setOpenMenu(false);
                                  UploadPDFAction(e.target.files[0],open, setOpen, setMessage, setSeverity,handleClose,handleOpen)
                                  }} type="file" accept="application/pdf, image/*"/>
                            </ListItemButton>
                        </List>
                    </Menu>
                    </div>
                    <List className="p-0 mt-2">
                        <ListItemButton onClick={()=>{history("")}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <HomeIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Home"/>
                        </ListItemButton>

                        <ListItemButton onClick={()=>{history("MyDrive")}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <LibraryBooksIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="My Drive"/>
                        </ListItemButton>
                    </List>

                    <List className="mt-3">
                       <ListItemButton onClick={()=>{history("Share")}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <ShareIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Share item"/>
                        </ListItemButton>
                        
                       <ListItemButton onClick={()=>{history("Recent")}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <AccessTimeFilledIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Recent"/>
                        </ListItemButton>

                       <ListItemButton onClick={()=>{history("Stared")}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon>
                               <StarIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Starred"/>
                        </ListItemButton>
                    </List>

                    <List className="mt-3">
                       <ListItemButton onClick={()=>{SignOut(setOpen,open,setMessage,setSeverity,handleClose,handleOpen,history)}} style={{color:"#05386b"}} className="rounded-5">
                           <ListItemIcon> 
                               <LogoutIcon sx={{ color:"#05386b" }}/>
                            </ListItemIcon>
                           <ListItemText primary="Logout"/>
                        </ListItemButton>
                       <div className="col-12">
                          <div className="row mt-4 ml-2 p-3 d-flex justify-content-center align-items-center">
                            <LinearProgress className="ml-3" variant="determinate" value={JSON.parse(localStorage.getItem('ProgressParsecent'))} style={{height:"12px",width:"100%",borderRadius:"10px",backgroundColor:""}}/>
                            <p><span>{JSON.parse(localStorage.getItem('spaceUsed'))}</span> out of <span>1GB</span></p>
                          </div>
                       </div>
                    </List>
            </div>
           </div> 
    );
}

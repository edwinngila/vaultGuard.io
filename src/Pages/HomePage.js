import { Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import WebLogo from "../Img/Vault Guard (1).svg"
import {Button, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, TextField, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { SnackTost } from "../UseContext/Hook";
import SignOut from "../FirebaseFunctions/SignoutFunctions";
import { Progress } from "../UseContext/ScreenLoader";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const HomePage=()=>{
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();
    const RoundedTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
          backgroundColor:"#E9EEF6",

          '&.Mui-focused fieldset': {
            borderColor: '#E9EEF6',
          },
        },
      });
    return(
        <Container fluid>
           <div style={{height:"100vh"}} className="row">
                <div style={{backgroundColor:"#86D5A7"}} className="col-2">
                    <img width={180} src={WebLogo} alt="img"></img>
                    <Button style={{background:"#379683"}} className="mt-3 p-4 rounded-4" startIcon={<AddIcon />} variant="contained">New</Button>
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
                         <div className="col-4">

                         </div>
                    </div>
                    <SimpleBar className="rounded-top-4 " style={{ height: "93.9vh",backgroundColor:"#EDF5E1"}}>
                        <p>3</p>
                    </SimpleBar>
                </div>
           </div>
        </Container>
    );
}
export default HomePage;
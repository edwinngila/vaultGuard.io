import { Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import {Avatar, Breadcrumbs, Drawer, InputAdornment, Menu, MenuItem, TextField, Typography, styled } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import "../css/HomePage.css";
import menu from "../Img/list.png"
import { MenuLinks } from "../Components/MenuLinks";
import { useState } from "react";
import { MenuLinksDrower } from "../Components/MenuLinksDrower";


const HomePage=()=>{
  const [openDrower,setOpenDrower]=useState(false);
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       console.log("File uploaded:", file);
    //       setUploadFile(file);
    //     }
    //   };
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
        <Container style={{overflowX:"hidden"}} fluid>
           <div style={{height:"100vh"}} className="row">
                <div style={{backgroundColor:"#86D5A7"}} className="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-2 col-xxl-2 sideNav">
                   <MenuLinks/>
                </div>
                <div style={{backgroundColor:"#86D5A7"}}  className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-10 col-xxl-10">  
                    <div style={{backgroundColor:"#86D5A7"}} className="row p-2">
                         <div className="col-8">
                             <div className="row">
                                <div className="col-2 col-sm-3 col-md-2 col-lg-0 col-xl-0 d-flex justify-content-center align-content-center">
                                   <img onClick={()=>{setOpenDrower(!openDrower)}} style={{cursor:"pointer"}} className="mt-3 buggerMenu" height={"30px"} width={"30px"} src={menu} alt="img"></img>
                                   <Drawer className="p-2" style={{width:"300px",backgroundColor:"#86D5A7"}} open={openDrower} onClose={()=>{setOpenDrower(!openDrower)}}>
                                      <MenuLinksDrower/> 
                                   </Drawer>
                                </div>
                                <div className="col-10 col-sm-9 col-md-10 col-lg-12 col-xl-12">
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
                             </div>
                         </div>
                         <div className="col-4 d-flex justify-content-end align-content-end">
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                             <Menu
                              id="basic-menu"
                              open={false}
                              MenuListProps={{
                                'aria-labelledby': 'basic-button',
                              }}
                            >
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>My account</MenuItem>
                                <MenuItem>Logout</MenuItem>
                            </Menu>
                         </div>
                    </div>
                      <SimpleBar className="rounded-top-4" style={{ height: "88.5vh",backgroundColor:"#EDF5E1",overflowX:"hidden"}}>
                              <div className="row p-3">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
                              <Outlet/>
                        </SimpleBar>
                </div>
           </div>
        </Container>
    );
}
export default HomePage;
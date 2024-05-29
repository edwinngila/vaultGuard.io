import { Button, TextField} from "@mui/material";
import { Container, Form, FormGroup } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import "../css/signupForm.css"
import { useContext, useState } from "react";
import HandleSubmit from "../FirebaseFunctions/SignupFunctions";
import { SnackTost } from "../UseContext/Hook";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "../UseContext/ScreenLoader";

const SignupForm =()=>{
    const[FirstName,setFirstName]=useState();
    const[SecondName,setSecondName]=useState();
    const[email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();

    const handleSubmit = (e, FirstName, SecondName, email, Password,handleClose,handleOpen,history) => {
        e.preventDefault();
        HandleSubmit(FirstName, SecondName, email, Password,setMessage, setSeverity,open, setOpen,handleClose,handleOpen,history);
    };
    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}} className="d-flex justify-content-center align-content-center ">
            <div className="row d-flex align-items-center justify-content-center">
                <Form onSubmit={(e)=>{handleSubmit(e,FirstName, SecondName, email, Password,handleClose,handleOpen,history)}} className="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-9 col-xxl-9 p-5 rounded-2" style={{backgroundColor:"#379683"}}>
                    <div className="row">
                        <h1 className="mt-1" style={{color:"#edf5e1"}}>Create an account</h1>
                        <h6 style={{color:"#edf5e1"}}>Welcome! Pleace enter your details</h6>
                    </div>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="FirstName" 
                            className="mt-3 form-inputs"
                            variant="outlined" 
                            name="firstname"
                            value={FirstName}
                            onChange={(e)=>{setFirstName(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="SecondName" 
                            className="mt-3 form-inputs"
                            variant="outlined" 
                            name="lastname"
                            value={SecondName}
                            onChange={(e)=>{setSecondName(e.target.value)}}
                        />
                    </FormGroup>
            
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Email" 
                            className="mt-3 form-inputs"
                            variant="outlined" 
                            name="Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Password" 
                            className="mt-3 form-inputs"
                            variant="outlined" 
                            type="password"
                            name="password"
                            value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="mt-4 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} >Signup</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-3 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} startIcon={<GoogleIcon />}>Signup with Google</Button>
                    </FormGroup>
                    <div className="row d-flex justify-content-center align-content-center ">
                        <p className="mt-3" style={{textAlign:"center"}}>You have an account <Link style={{color:"#edf5e1"}} to="/Signin"><b>Login</b></Link></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
export default SignupForm;
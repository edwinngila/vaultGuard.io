import { Button, TextField} from "@mui/material";
import { Container, Form, FormGroup } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import "../css/signupForm.css"
import { useContext, useState } from "react";
import HandleSubmit from "../FirebaseFunctions/SignupFunctions";
import { SnackTost } from "../UseContext/Hook";

const SignupForm =()=>{
    const[FirstName,setFirstName]=useState();
    const[SecondName,setSecondName]=useState();
    const[email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);

    const handleSubmit = (e, FirstName, SecondName, email, Password) => {
        e.preventDefault();
        HandleSubmit(FirstName, SecondName, email, Password,setMessage, setSeverity,open, setOpen);
    };
    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}} className="d-flex justify-content-center align-content-center ">
            <div className="col-4 row d-flex align-items-center justify-content-center mt-5 rounded-2" style={{backgroundColor:"#379683",height:"90vh"}}>
                <Form onSubmit={(e)=>{handleSubmit(e,FirstName, SecondName, email, Password)}} className="col-10">
                    <div className="row">
                        <h2 className="mt-3" style={{color:"#edf5e1"}}>Create an account</h2>
                        <h6 style={{color:"#edf5e1"}}>Welcome! Pleace enter your details</h6>
                    </div>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="FirstName" 
                            className="mt-4 form-inputs"
                            variant="outlined" 
                            value={FirstName}
                            onChange={(e)=>{setFirstName(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="SecondName" 
                            className="mt-4 form-inputs"
                            variant="outlined" 
                            value={SecondName}
                            onChange={(e)=>{setSecondName(e.target.value)}}
                        />
                    </FormGroup>
            
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Email" 
                            className="mt-4 form-inputs"
                            variant="outlined" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Password" 
                            className="mt-4 form-inputs"
                            variant="outlined" 
                            type="password"
                            value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="mt-4 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} >Signup</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-4 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} startIcon={<GoogleIcon />}>Signup with Google</Button>
                    </FormGroup>
                    <div className="row d-flex justify-content-center align-content-center ">
                        <p className="mt-3" style={{textAlign:"center"}}>You have an account <a href="#" alt="redirect" style={{color:"#edf5e1"}}><b>Login</b></a></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
export default SignupForm;
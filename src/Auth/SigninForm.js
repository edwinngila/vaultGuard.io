import { Button, TextField} from "@mui/material";
import { Container, Form, FormGroup } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import "../css/signupForm.css"

const SigninForm =()=>{
    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}} className="d-flex justify-content-center align-content-center ">
            <div className="col-4 row d-flex align-items-center justify-content-center mt-5 rounded-2" style={{backgroundColor:"#379683",height:"90vh"}}>
                <Form className="col-11">
                    <div className="row">
                        <h2 className="mt-3" style={{color:"#edf5e1"}}>Login in to your account</h2>
                        <h6 style={{color:"#edf5e1"}}>Welcome back! Please enter your details</h6>
                    </div>
            
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Email" 
                            className="mt-4 form-inputs"
                            variant="outlined" 
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-4 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} >Login</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-4 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} startIcon={<GoogleIcon />}>Login with Google</Button>
                    </FormGroup>
                    <div className="row d-flex justify-content-center align-content-center ">
                        <p className="mt-3" style={{textAlign:"center"}}>Don't have an account <a href="#" alt="redirect" style={{color:"#edf5e1"}}><b>Sign up</b></a></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
export default SigninForm;
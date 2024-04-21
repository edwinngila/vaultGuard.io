import { Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { Container, Form, FormGroup } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import "../css/signupForm.css"
import HandleSubmit from "../FirebaseFunctions/SigninFunctions";
import { useContext, useState } from "react";
import { SnackTost } from "../UseContext/Hook";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "../UseContext/ScreenLoader";

const SigninForm =()=>{
    const[email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const [rememberMe, setRememberMe] = useState(false);
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();
    const handleSubmit = async (e,email, Password,rememberMe,handleClose,handleOpen,history) => {
        e.preventDefault();
        HandleSubmit(email, Password,setMessage, setSeverity,open, setOpen,rememberMe,handleClose,handleOpen,history);
    };

    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}} className="d-flex justify-content-center align-content-center ">
            <div className="row d-flex align-items-center justify-content-center">
                 <Form style={{backgroundColor:"#379683"}} onSubmit={(e)=>{handleSubmit(e,email,Password,rememberMe,handleClose,handleOpen,history)}} className="col-8 p-5 rounded-2">
                    <div className="row">
                        <h2 className="mt-3" style={{color:"#edf5e1"}}>Login in to your account</h2>
                        <h6 style={{color:"#edf5e1"}}>Welcome back! Please enter your details</h6>
                    </div>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Email" 
                            name="Email"
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
                            name="password"
                            type="password"
                            value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-4 col-12 " type="submit" variant="contained" style={{backgroundColor:"#05386b"}} >Login</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-4 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} startIcon={<GoogleIcon />}>Login with Google</Button>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between">
                      <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#05386b',
                                        },
                                    }}
                                />
                            }
                            label="Remember Me"
                            sx={{ color: '#05386b' }}
                            onChange={()=>{setRememberMe(!rememberMe)}}
                        />
                        <Link style={{color: '#05386b'}} className="p-2" to={"/Forgotpassword"}>Forgotpassword?</Link>
                    </FormGroup>
                    <div className="row d-flex justify-content-center align-content-center ">
                        <p className="mt-5" style={{textAlign:"center"}}>Don't have an account <Link style={{color:"#edf5e1"}} to="/Signup"><b>Sign up</b></Link></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
export default SigninForm;
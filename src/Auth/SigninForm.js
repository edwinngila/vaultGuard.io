import { Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { Container, Form, FormGroup } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import "../css/signupForm.css"
import HandleSubmit from "../FirebaseFunctions/SigninFunctions";
import { useContext, useState } from "react";
import { SnackTost } from "../UseContext/Hook";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "../UseContext/ScreenLoader";
import ReCAPTCHA from "react-google-recaptcha";
import { ListDirectories } from "../FirebaseFunctions/HomeFunctions";

const SigninForm =()=>{
    const[email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const [rememberMe, setRememberMe] = useState(false);
    const[saveItems,setSaveItems]=useState(false)
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();
   
    const handleSubmit = async (e,email, Password,rememberMe,handleClose,handleOpen,history) => {
        e.preventDefault();
        if(saveItems){
         HandleSubmit(email, Password,setMessage, setSeverity,open, setOpen,rememberMe,handleClose,handleOpen,history);
        }
        else{
            setOpen(!open)
            setMessage("check the caption box")
            setSeverity("error")
        }
    };
    const RecaptchaOnChange=(value)=>{
        if(value){
            setSaveItems(true);

        }
        else{
            setOpen(!open)
            setMessage("errorCode")
            setSeverity("error")
        }
      }

    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}} className="d-flex justify-content-center align-content-center ">
            <div className="row d-flex align-items-center justify-content-center">
                 <Form style={{backgroundColor:"#379683"}} onSubmit={(e)=>{handleSubmit(e,email,Password,rememberMe,handleClose,handleOpen,history)}} className="col-11 col-sm-8 col-md-8 col-lg-8 col-xl-8 p-5 rounded-2">
                    <div className="row">
                        <h2 className="mt-1" style={{color:"#edf5e1"}}>Login in to your account</h2>
                        <h6 style={{color:"#edf5e1"}}>Welcome back! Please enter your details</h6>
                    </div>
                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic1" 
                            label="Email" 
                            name="Email"
                            className="mt-2 form-inputs"
                            variant="outlined" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </FormGroup>

                    <FormGroup>
                        <TextField 
                            fullWidth 
                            id="outlined-basic2" 
                            label="Password" 
                            className="mt-3 form-inputs"
                            variant="outlined" 
                            name="password"
                            type="password"
                            value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </FormGroup>

                    <FormGroup className="mt-2 d-flex justify-content-center">
                        <ReCAPTCHA onChange={RecaptchaOnChange} sitekey="6LdDHcwpAAAAAMUJz8hIbMSIloiPJq6Xuho-kpI-"/>
                    </FormGroup>

                    <FormGroup>
                        <Button 
                        className="mt-3 col-12 g-recaptcha" 
                        data-sitekey="reCAPTCHA_site_key"
                        data-callback='onSubmit'
                        data-action='submit'
                        type="submit" 
                        variant="contained" 
                        style={{backgroundColor:"#05386b"}} 
                        >Login</Button>
                    </FormGroup>
                   
                    <FormGroup>
                        <Button className="mt-3 col-12 " variant="contained" style={{backgroundColor:"#05386b"}} startIcon={<GoogleIcon />}>Login with Google</Button>
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
                        <p className="mt-4" style={{textAlign:"center"}}>Don't have an account <Link style={{color:"#edf5e1"}} to="/Signup"><b>Sign up</b></Link></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
export default SigninForm;
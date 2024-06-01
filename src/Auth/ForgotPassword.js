import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Container, Form, FormGroup} from "react-bootstrap"
import HandleSubmit from "../FirebaseFunctions/ForgotPassword";
import { SnackTost } from "../UseContext/Hook";
import { Progress } from "../UseContext/ScreenLoader";
import { useNavigate } from "react-router-dom";
import WebLogo from "../Img/Vault Guard (1).svg"

const Forgotpassword=()=>{
    const[email,setEmail]=useState();
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();

    const handleSubmit=(e,email,handleClose,handleOpen,open, setOpen, setMessage, setSeverity )=>{
        e.preventDefault();
        HandleSubmit(email,handleClose,handleOpen,open, setOpen, setMessage, setSeverity,history );
    }
    return(
        <Container fluid style={{backgroundColor:"#86D5A7",height:"100vh"}}>
            <div  style={{textAlign:"center",height:"100vh"}} className="d-flex justify-content-center align-items-center row ">
                <Form onSubmit={(e)=>{handleSubmit(e,email,handleClose,handleOpen,open, setOpen, setMessage, setSeverity )}} className="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 mt-5">
                    <div className="row">
                        <img width={"120px"} height={"120xp"} src={WebLogo} alt="img"></img>
                    </div>
                    <h2>Forgot your password?</h2>
                    <h6>We'll email you instructions on how to reset your password</h6>
                   <FormGroup>
                        <TextField
                            fullWidth 
                            id="outlined-basic" 
                            label="Email" 
                            name="Email"
                            className="form-inputs"
                            variant="outlined" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className="mt-4 col-12 " type="submit" variant="contained" style={{backgroundColor:"#05386b"}} >Reset password</Button>
                    </FormGroup>
                </Form>
            </div>
        </Container>
    )
}
export default Forgotpassword;
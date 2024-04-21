import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Container, Form, FormGroup} from "react-bootstrap"
import HandleSubmit from "../FirebaseFunctions/ForgotPassword";

const Forgotpassword=()=>{
    const[email,setEmail]=useState();
    const handleSubmit=(e,email)=>{
        e.preventDefault();
        HandleSubmit(email);
    }
    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}}>
            <div style={{textAlign:"center"}} className="d-flex justify-content-center align-items-center row ">
                <h2>Forgot your password?</h2>
                <h6>We'll email you instructions on how to reset your password</h6>
                <Form onSubmit={(e)=>{handleSubmit(e,email)}} className="col-3 mt-5">
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
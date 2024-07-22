import { Container } from "react-bootstrap"
import { Button, Card, CardContent, Typography } from "@mui/material";
import VerifyEmailLog from '../Img/security.png'
import { useContext, useState } from "react";
import OTPInput from "react-otp-input";
import "../css/OTPpage.css"
import { useNavigate, useParams } from "react-router-dom";
import { GetOTP } from "../FirebaseFunctions/OTPFunction";
import { SnackTost } from "../UseContext/Hook";
import { Progress } from "../UseContext/ScreenLoader";

const OTP=()=>{
    const [otp, setOtp] = useState('');
    const { email } = useParams();
    const { open, setOpen, setMessage, setSeverity } = useContext(SnackTost);
    const{handleClose,handleOpen}=useContext(Progress);
    const history = useNavigate();

    const HandleSubmit=(handleClose,handleOpen,history,setMessage,setSeverity,open,setOpen,otp)=>{
      console.log(otp)
      if(otp==null){
        setOpen(!open)
        setMessage("Fill all Fields")
        setSeverity("error")
      }
      GetOTP(handleClose,handleOpen,history,setMessage, setSeverity,open, setOpen,otp)
    }
    return(
        <Container fluid style={{backgroundColor:"#5cdb95",height:"100vh"}} className="main-container">
            <div className="row">
                <div className="col-12 d-flex align-content-center justify-content-center p-3">
                    <div className="row mt-5 d-flex justify-content-center">
                    <Card className="mt-5 p-3" style={{width:"450px",backgroundColor:"#379683"}} sx={{ Width: 900, Height: 600 }}>
                        <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <img src={VerifyEmailLog}></img>
                        </div>
                        </div>
                        <CardContent style={{textAlign:"center"}}>
                            <Typography gutterBottom variant="h3" component="div">
                               Enter your OTP
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              we've sent a email <span style={{color:"white"}}>{email}</span> to verify that it is you login in to the account. The link in the email will expire in 24 hours. 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <div className="row d-flex justify-content-center align-content-center p-4">
                                <OTPInput
                                    shouldAutoFocus
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    inputStyle={{height:"50px",width:"50px",borderRadius:"5px"}}
                                    renderSeparator={<span style={{color:"#379683"}}>-</span>}
                                    renderInput={(props) => <input  {...props} />}
                                />
                            </div>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <div className="row d-flex justify-content-center align-content-center p-4">
                               <Button onClick={()=>{HandleSubmit(handleClose,handleOpen,history,setMessage,setSeverity,open,setOpen,otp)}} variant="contained" style={{backgroundColor:"#05386B"}}>Verify OTP</Button>
                            </div>
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default OTP;
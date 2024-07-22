import { Container } from "react-bootstrap"
import VerifyEmailLog from '../Img/email (2).png'
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const VerifyEmail=()=>{
    return(
        <Container  style={{backgroundColor:"#5cdb95",height:"100vh"}} fluid>
            <div className="row">
                <div className="col-12 d-flex align-content-center justify-content-center">
                    <div className="row mt-5 d-flex justify-content-center">
                    <Card className="mt-5" style={{width:"450px",backgroundColor:"#379683"}} sx={{ Width: 900, Height: 600 }}>
                        <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <img src={VerifyEmailLog}></img>
                        </div>
                        </div>
                        <CardContent style={{textAlign:"center"}}>
                            <Typography gutterBottom variant="h3" component="div">
                              Verify your email
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              we've sent an email to {} to verify your email address and activate your account. The link in the email will expire in 24 hours. 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <a style={{color:"#05386B"}} href="#">Click her</a> if you did not receive an email or would like to change the email address you signed up with 
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default VerifyEmail;
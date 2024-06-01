import { Container, Image, Navbar, Row } from "react-bootstrap";
import logo from '../Img/Vault Guard (2).png';
import Vault from '../Img/lock (1).png';
import { Button } from "@mui/material";

const LandingPage=()=>{
    return(
        <Container style={{height:"100vh",background:"#86D5A7"}} fluid>
            <Row>
                <Navbar>
                    <Container className="d-flex align-content-between justify-content-between" fluid>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src={logo}
                                width={'160px'}
                                height={'100px'}
                                className="d-inline-block align-top"
                                />{' '}
                        </Navbar.Brand>
                    <Container>
                            <Row className="d-flex align-content-between justify-content-end">
                                <Button style={{backgroundColor:"#05386b"}} className="m-1 col-1" variant="contained" href="/Signup">Signup</Button>
                                <Button style={{backgroundColor:"#05386b"}} className="m-1 col-1" variant="contained" href="/Signin">Signin</Button>
                            </Row>
                    </Container>
                    </Container>
                </Navbar>
            </Row>
            <Row>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                       <div className="row d-flex align-content-end mt-5">
                            <h1>Vault Guard </h1>
                            <h1>online back up services</h1>
                            <h1>Store your data with us today</h1>
                            <p className="mt-3" style={{fontSize:"20px"}}>Vault Guard is an advanced online backup system designed to offer users seamless data storage solutions. Through this platform, users can effortlessly create an accounts and securely upload their data to an online Vault</p>
                            <Button href="/Signup" style={{backgroundColor:"#379683"}} className="col-5 mt-4 m-3 p-3 rounded-4" variant="contained">Get started</Button>
                       </div>
                    </div>
                    <div className="col-6 d-flex align-content-end justify-content-end">
                       <Image style={{height:"370px",width:"370px"}}  alt="img" src={Vault}></Image>
                    </div>
            </Row>
        </Container>
    )
}
export default LandingPage;
import { Container, Image, Navbar, Row } from "react-bootstrap";
import logo from '../Img/Vault Guard (2).png';
import Vault from '../Img/Black & Blue Minimalist Modern Initial Font Logo.png';
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
                    <div className="col-6 d-flex align-items-center justify-items-center">
                        <h1>Vault Guard </h1>
                        <h1>online back up services</h1>
                        <h1>Store your data with us today</h1>
                    </div>
                    <div className="col-6 d-flex align-content-end justify-content-end">
                       <Image style={{height:"370px",width:"370px"}} alt="img" src={Vault}></Image>
                    </div>
            </Row>
        </Container>
    )
}
export default LandingPage;
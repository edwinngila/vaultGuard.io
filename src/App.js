import "bootstrap/dist/css/bootstrap.min.css"
import SignupForm from "./Auth/SignupForm";
import SigninForm from "./Auth/SigninForm";
import { SnackTost } from "./UseContext/Hook";
import { Progress } from "./UseContext/ScreenLoader";
import { useEffect, useState } from "react";
import SimpleSnackbar from "./Components/snackBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Forgotpassword from "./Auth/ForgotPassword";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import ScreenLoader from "./Components/ScreenLoader";
import Cookies from "js-cookie";
import FormDialog from "./Components/ScreenDialog";

function App() {
  const [open, setOpen] = useState(false);
  const [message,setMessage]= useState('');
  const [severity,setSeverity]=useState();
  const [OpenLoader, setOpenLoader] = useState(false);
  const [OpenDialog,setOpenDialog]= useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenLoader(false);
  };

  const handleOpen = () => {
      setOpenLoader(true);
  };

  const snackBarValues={
    open, setOpen,
    message,setMessage,
    severity,setSeverity,
  }

  const ScreenPops ={
    OpenLoader,setOpenLoader,
    handleClose,handleOpen,
    handleDialogOpen,handleDialogClose,
    OpenDialog,setOpenDialog
  }
  const history= useNavigate()
  useEffect(() => {
    const rememberMeCookie = Cookies.get("RememberMe");
    const usernameCookie = Cookies.get('Name');
    

    if (rememberMeCookie === 'true' && usernameCookie) {
        history("/HomePage")
    }
},[]);
  return (
    <SnackTost.Provider value={snackBarValues}>
      <Progress.Provider value={ScreenPops}>
          <FormDialog/>
          <ScreenLoader/>
          <SimpleSnackbar/>
            <Routes>
                <Route element={<SigninForm/>} path="/Signin" index />
                <Route element={<SignupForm/>} path="/Signup"/>
                <Route element={<HomePage/>} path="/HomePage"/>
                <Route element={<LandingPage/>} path="/"/>                
                <Route element={<Forgotpassword/>} path="/Forgotpassword"/>
            </Routes>
        </Progress.Provider>
    </SnackTost.Provider>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css"
import SignupForm from "./Auth/SignupForm";
import SigninForm from "./Auth/SigninForm";
import { SnackTost } from "./UseContext/Hook";
import { Progress } from "./UseContext/ScreenLoader";
import { useEffect, useState } from "react";
import SimpleSnackbar from "./Components/snackBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Forgotpassword from "./Auth/ForgotPassword";
import LandingPage from "./Pages/LandingPage";
import ScreenLoader from "./Components/ScreenLoader";
import Cookies from "js-cookie";
import FormDialog from "./Components/ScreenDialog";
import HomeSubPage from "./sub-pages/HomeSubPage";
import MyDriveSubPage from "./sub-pages/MyDriveSubPage";
import RecentSubPage from "./sub-pages/RecentSubPage";
import ShareSubPage from "./sub-pages/ShareSubPage";
import StaredSubPage from "./sub-pages/StaredSubPage";
import HomePage from "./Pages/HomePage";
import OnlineStatus from "./Components/OnlineStatus";
import { calculateSpace } from "./FirebaseFunctions/calculateSpace";
import ViewFolder from "./sub-pages/ViewFolder";

function App() {
  const [open, setOpen] = useState(false);
  const [message,setMessage]= useState('');
  const [severity,setSeverity]=useState();
  const [OpenLoader, setOpenLoader] = useState(false);
  const [OpenDialog,setOpenDialog]= useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnline,setShowOnline] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const statusDialogOpen = () => {
    setShowOnline(true);
  };

  const statusDialogClose = () => {
    setShowOnline(false);
  };

  const handleClose = () => {
    setOpenLoader(false);
  };

  const handleOpen = () => {
      setOpenLoader(true);
  };
  const statusBox={
    showOnline,isOnline,
    statusDialogOpen,statusDialogClose
  }

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
    calculateSpace();  

    if (rememberMeCookie === 'true' && usernameCookie) {
        history("/HomePage")
        calculateSpace();
    }
 },[]);
  return (
    <div style={{overflowY:"hidden"}}>
      <SnackTost.Provider value={snackBarValues}>
      <Progress.Provider value={ScreenPops}>
          <FormDialog/>
          <ScreenLoader/>
          <SimpleSnackbar/>
          <OnlineStatus/>
            <Routes>
                <Route element={<SigninForm/>} path="/Signin" index />
                <Route element={<SignupForm/>} path="/Signup"/>
                <Route element={<LandingPage/>} path="/"/>                
                <Route element={<Forgotpassword/>} path="/Forgotpassword"/>
                <Route element={<HomePage/>} path="/HomePage">
                    <Route index path='' element={<HomeSubPage/>}/>
                    <Route path='MyDrive' element={<MyDriveSubPage/>}/>
                    <Route path='Recent' element={<RecentSubPage/>}/>
                    <Route path='Share' element={<ShareSubPage/>}/>
                    <Route path='Stared' element={<StaredSubPage/>}/>
                    <Route path='ViewFolder/:items' element={<ViewFolder/>}/>
                </Route>
            </Routes>
        </Progress.Provider>
     </SnackTost.Provider>
    </div>
  );
}

export default App;

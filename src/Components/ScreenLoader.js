import { Backdrop, CircularProgress, Fade } from "@mui/material";
import { useContext } from "react";
import { Progress } from "../UseContext/ScreenLoader";

const ScreenLoader=()=>{
    const{OpenLoader}=useContext(Progress);
    return(
    <Fade in={OpenLoader}>
        <Backdrop
           sx={{ color: '#379683', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open={OpenLoader}
        >
           <CircularProgress style={{color:"#379683"}}/>
       </Backdrop>
   </Fade>
    )
}
export default ScreenLoader;
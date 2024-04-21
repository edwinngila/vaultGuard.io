import { Backdrop, CircularProgress, Fade } from "@mui/material";
import { useContext } from "react";
import { Progress } from "../UseContext/ScreenLoader";

const ScreenLoader=()=>{
    const{OpenLoader}=useContext(Progress);
    return(
    <Fade in={OpenLoader}>
        <Backdrop
           sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open={OpenLoader}
        >
           <CircularProgress color="secondary" />
       </Backdrop>
   </Fade>
    )
}
export default ScreenLoader;
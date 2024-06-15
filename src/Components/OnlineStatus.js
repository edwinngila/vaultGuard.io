import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import offline from "../Video/OfflineAnimation.gif";
import online from "../Video/connected.gif";
// import { Progress } from "../UseContext/ScreenLoader";
import React, { useEffect, useState } from "react";

export default function OnlineStatus() {
  // const{showOnline,isOnline, statusDialogOpen,statusDialogClose}=React.useContext(Progress);
  const [isOnline,setIsOnline] = useState(navigator.onLine);

  const handleCheck = () =>{
    setIsOnline(navigator.onLine)
    console.log(isOnline)
  }
  useEffect(()=>{
    window.addEventListener('online',handleCheck)
    window.addEventListener('offline',handleCheck)
  },[])
    return (
        <Dialog
          open={true}
          fullWidth
          maxWidth={'xs'}
        >
          <DialogContent>
                 <DialogContentText>
                  {isOnline?
                  <div className="row">
                    <div className="col-5">
                      <img width={"120px"} height={"120px"} src={offline} alt="img"></img>
                    </div>
                    <div className="col-7">
                        <div className="row mt-4">
                            <h3>You are offline!!</h3>
                            <p style={{fontSize:"15px"}}>Check your internet connection</p>
                        </div>
                    </div>
                  </div>:
                   <div className="row">
                   <div className="col-4">
                     <img width={"120px"} height={"120px"} src={online} alt="img"></img>
                   </div>
                   <div className="col-8">
                       <div className="row mt-4">
                           <h5>You are connection is back</h5>
                           <p style={{fontSize:"15px"}}>Welcome back</p>
                       </div>
                   </div>
                  </div>
                  }
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
  }
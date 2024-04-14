import "bootstrap/dist/css/bootstrap.min.css"
import SignupForm from "./Auth/SignupForm";
// import SigninForm from "./Auth/SigninForm";
import { SnackTost } from "./UseContext/Hook";
import { useState } from "react";
import SimpleSnackbar from "./Components/snackBar";

function App() {
  const [open, setOpen] = useState(false);
  const [message,setMessage]= useState('');
  const [severity,setSeverity]=useState();
  const snackBarValues={
    open, setOpen,
    message,setMessage,
    severity,setSeverity
  }
  return (
    <SnackTost.Provider value={snackBarValues}>
          <SimpleSnackbar/>
          <SignupForm/>
       {/* // <SigninForm/> */}
    </SnackTost.Provider>
  );
}

export default App;

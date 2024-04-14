import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SnackTost } from '../UseContext/Hook';

export default function SimpleSnackbar() {

  const{open,setOpen,message,severity}=React.useContext(SnackTost);

   const alertStyle = {
      backgroundColor: (severity === 'error' && '#d32f2f') ||
                       (severity === 'warning' && '#f57c00') ||
                       (severity === 'info' && '#1976d2') ||
                       (severity === 'success' && '#388e3c'),
      color: 'white',
      width: 350,
    };

    const iconMapping = {
      error: <ErrorIcon style={{ color: 'white' }}/>,
      warning: <WarningIcon style={{ color: 'white' }}/>,
      info: <InfoIcon style={{ color: 'white' }}/>,
      success: <CheckCircleIcon style={{ color: 'white' }}/>,
    };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        action={action}
        > 
        <Alert severity={severity} style={alertStyle} iconMapping={iconMapping}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Progress } from '../UseContext/ScreenLoader';
import { SnackTost } from '../UseContext/Hook';
import { newFolderAction } from '../FirebaseFunctions/HomeFunctions';

export default function FormDialog() {
  const { open, setOpen, setMessage, setSeverity } = React.useContext(SnackTost);
  const{handleDialogClose,OpenDialog,handleClose,handleOpen}=React.useContext(Progress);
  const[newFolder,setNewFolder]=React.useState()
  return (
      <Dialog
        open={OpenDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth={'xs'}
      >
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            value={newFolder}
            onChange={(e)=>{setNewFolder(e.target.value)}}
            id="name"
            name="Untitled folder"
            label="Untitled folder"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="submit" onClick={()=>{newFolderAction(newFolder,open, setOpen, setMessage, setSeverity,handleClose,handleOpen);handleDialogClose()}}>Create</Button>
        </DialogActions>
      </Dialog>
  );
}

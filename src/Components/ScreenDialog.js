import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Progress } from '../UseContext/ScreenLoader';

export default function FormDialog() {
  const{handleDialogClose,OpenDialog}=React.useContext(Progress);
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
            id="name"
            name="Untitled folder"
            label="Untitled folder"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid2, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function FormDialog({ handleClose, open }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        fullWidth
        maxWidth="md"
        
      >
        <Grid2 container alignItems="center" justifyContent="space-between" sx={{paddingRight:2}}>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Invite to Workspace
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
        </Grid2>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            color="black"
            sx={{ borderColor: "black", color: "black" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"black"}}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{backgroundColor:"black"}}>Invite</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

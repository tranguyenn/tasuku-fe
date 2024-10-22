import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, CardMedia, Container, Grid2, Stack, TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function TaskDialog({ handleClose, handleClickOpen, open }) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 0,
            backgroundColor: "black",
            color: "white",
            marginTop: 1,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* <Box sx={{flexGrow:1}}>
            
                <img alt="thumbnail" src="https://picsum.photos/1920/1080" height={220} width="100%" style={{borderRadius:"16px"}}/>
            
          </Box> */}
          <Box>
            <Grid2>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  border: "1px dashed black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "16px",
                  marginBottom: 4,
                  marginTop: 5,
                }}
              >
                <Typography variant="h3">Drop Image</Typography>
              </Box>
              <Stack spacing={4}>
                <TextField
                  id="outlined-basic"
                  label="Task Name"
                  variant="outlined"
                  color="black"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Desciption"
                  variant="outlined"
                  color="black"
                  fullWidth
                />
              </Stack>
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose} sx={{backgroundColor:"black"}}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

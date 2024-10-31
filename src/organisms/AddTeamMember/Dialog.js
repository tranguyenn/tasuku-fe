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
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addMemberToBoard } from "../../features/task/taskSlice";
import FTextField from "../form/FTextField";

const yupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function FormDialog({ handleClose, open, boardId }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("submit dialog", boardId);
    const email=data.email;
    dispatch(addMemberToBoard({boardId,email})).then(() => reset());
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <Grid2
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingRight: 2 }}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Invite to Workspace
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
        </Grid2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              {/* <TextField
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
          /> */}
              <FTextField
                name="email"
                multiline
                fullWidth
                rows={1}
                placeholder="Enter email"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: "black" }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "black" }}
              >
                Invite
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
}

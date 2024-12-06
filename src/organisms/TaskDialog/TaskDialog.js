import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CardMedia,
  Container,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import FUploadImage from "../form/FUploadImage";
import { createTak, createTask } from "../../features/task/taskSlice";
import FTextField from "../form/FTextField";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const yupSchema = Yup.object().shape({
  name: Yup.string().required("Task name is required"),
  description: Yup.string().required("Description is required"),
});
export default function TaskDialog({
  handleClose,
  handleClickOpen,
  open,
  boardId,
}) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
  });
  const { isLoading } = useSelector((state) => state.task);
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(acceptedFiles);
      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const onSubmit = (data) => {
    console.log("submit",data)
    const content = {
      name: data.name,
      description: data.description,
      status: "pending", 
      cover: data.image,
      board: boardId,
    };
    dispatch(createTask(content)).then(() => reset());
  };
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
              <Box>
                <Grid2>
                  <Box
                    sx={{
                      mt: 20,
                      width: "100%",
                      height: 250,
                      border: "1px dashed black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "16px",
                      marginBottom: 4,
                      marginTop: 5,
                    }}
                  >
                    <FUploadImage
                      name="image"
                      accept="image/*"
                      maxSize={3145728}
                      onDrop={handleDrop}
                    />
                  </Box>
                  <Stack spacing={4}>
                    <FTextField
                      id="outlined-basic"
                      name="name"
                      label="Task Name"
                      variant="outlined"
                      color="black"
                      fullWidth
                    />
                    <FTextField
                      id="outlined-basic"
                      multiline
                      fullWidth
                      rows={4}
                      name="description"
                      label="Description"
                      variant="outlined"
                      color="black"
                    />
                  </Stack>
                </Grid2>
              </Box>
            </DialogContent>
            <DialogActions>
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting || isLoading}
              >
                Create
              </LoadingButton>
            </DialogActions>
          </form>
        </FormProvider>
      </BootstrapDialog>
    </React.Fragment>
  );
}

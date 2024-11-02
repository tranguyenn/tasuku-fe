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
import {
  Avatar,
  Box,
  CardMedia,
  Container,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from "@mui/icons-material/Notes";
import CommentCard from "../Comment/CommentCard";
import { shallowEqual, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PostDelete from "./EditModalDelete";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FTextField from "../form/FTextField";
import FUploadImage from "../form/FUploadImage";
import { LoadingButton } from "@mui/lab";
import { updateTask, updateTaskInfor } from "../../features/task/taskSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const yupSchema = Yup.object().shape({
  description: Yup.string().required("Content is required"),
});
export default function EditTask({
  handleClose,
  open,
  column,
  content,
  taskName,
  cover,
  taskId,
  boardId,
}) {
  const [comment, setComment] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const handleClickComment = () => {
    setShow(true);
  };
  const handleCommentChange = ({ value }) => {
    setDisable(false);
    setComment(value);
  };
  const defaultValues = {
    name: taskName,
    image: cover,
    description: content,
  };
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const { isLoading, error, taskList } = useSelector(
    (state) => ({
      isLoading: state.task.isLoading,
      error: state.task.error,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleCancel = () => {
    setShow(false);
    setComment("");
    setDisable(true);
  };

  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

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
    defaultValues.name= data.name;
    defaultValues.description = data.description;
    console.log("submit", data);
    const content = {
      name: data.name,
      description: data.description,
      cover: data.image,
      board: boardId,
    };
    dispatch(updateTaskInfor({ taskId, content, boardId }));
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
        <Grid2
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginRight: 1, marginBottom: 1, marginTop: "5px" }}
        >
          <Typography
            variant="h4"
            sx={{
              marginLeft: 1,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {taskName}{" "}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
              <Box>
                <Grid2>
                  {/* <Box>
                    <img
                      alt="thumbnail"
                      src={cover ? cover : "https://picsum.photos/1920/1080"}
                      width="100%"
                      height={250}
                      style={{ borderRadius: "16px", marginTop: "10px" }}
                    />
                  </Box> */}
                  <FUploadImage
                    name="image"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    width="100%"
                    height={250}
                    style={{ borderRadius: "16px", marginTop: "10px" }}
                  />
                  <Box sx={{ marginTop: 2, flexGrow: 1 }}>
                    <Grid2 container justifyContent="space-between" spacing={3}>
                      <Grid2 size={8}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            mt: "5px",
                            mb: "5px",
                          }}
                        >
                          {taskName}{" "}
                        </Typography>
                        <Typography sx={{ mt: "5px", mb: "5px" }}>
                          {" "}
                          {column}{" "}
                        </Typography>
                        <Grid2
                          container
                          alignItems="center"
                          sx={{ mt: "5px", mb: "5px" }}
                        >
                          <DescriptionRoundedIcon />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Desciption
                          </Typography>
                        </Grid2>
                        {/* <Typography sx={{ mt: "5px", mb: "5px" }}>
                          {content}
                        </Typography> */}
                        <FTextField
                          name="description"
                          multiline
                          fullWidth
                          // rows={4}
                          placeholder="Share what you are thinking here..."
                          sx={{
                            "& fieldset": {
                              borderWidth: `1px !important`,
                            },
                          }}
                        />

                        <Grid2>
                          <Grid2 container alignItems="center">
                            {/* <NotesIcon />
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              Activity
                            </Typography> */}
                          </Grid2>
                          {/* <Box>
                            <Grid2
                              container
                              sx={{ marginTop: 2 }}
                              spacing={2}
                              flexWrap="nowrap"
                            >
                              <Avatar
                                alt="avatar"
                                src="https://picsum.photos/200"
                              />
                              <TextField
                                id="outlined-textarea"
                                label="Write a comment..."
                                placeholder="Placeholder"
                                multiline
                                fullWidth
                                color="black"
                                value={comment}
                                onClick={handleClickComment}
                                onChange={handleCommentChange}
                                onBlur={handleCancel}
                              />
                            </Grid2>
                            {show ? (
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{ marginLeft: 7, marginTop: 2 }}
                              >
                                <Button variant="contained" disabled={disable}>
                                  Save
                                </Button>
                                <Button variant="text" onClick={handleCancel}>
                                  Canel
                                </Button>
                              </Stack>
                            ) : (
                              ""
                            )}
                          </Box> */}

                       
                        </Grid2>
                      </Grid2>
                      <Grid2 size={4} sx={{ paddingLeft: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccountCircleSharpIcon />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Action
                          </Typography>
                        </Stack>
                        <Stack spacing={2} sx={{ marginTop: 2 }}>
                          {/* <Button
                            variant="outlined"
                            startIcon={<ImageIcon />}
                            sx={{
                              borderColor: "black",
                              color: "black",
                              paddingX: 3,
                              paddingY: "4px",
                            }}
                          >
                            Cover
                          </Button> */}
                          {/* <Button
                        variant="outlined"
                        startIcon={<LocalOfferIcon />}
                        sx={{
                          borderColor: "black",
                          color: "black",
                          paddingX: 3,
                          paddingY: "4px",
                        }}
                      >
                        Labels
                      </Button> */}
                          {/* <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={onDelete}
                        sx={{
                          borderColor: "black",
                          color: "black",
                          paddingX: 3,
                          paddingY: "4px",
                        }}
                      >
                        Delete
                      </Button> */}
                          <PostDelete taskId={taskId} boardId={boardId} />
                        </Stack>
                      </Grid2>
                    </Grid2>
                  </Box>
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
                Edit
              </LoadingButton>
            </DialogActions>
          </form>
        </FormProvider>
      </BootstrapDialog>
    </React.Fragment>
  );
}

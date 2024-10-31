import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteTask } from "../../features/task/taskSlice";

function PostDelete({ taskId, boardId }) {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickDelete = (emoji) => {
    dispatch(deleteTask({ taskId, boardId}));
    setOpenDelete(false);
  };
  const handleClickOpen = () => {
    console.log("handle open");
    setOpenDelete(true);
  };

  const handleClose = () => {
    console.log("handle close");

    setOpenDelete(false);
  };
  return (
    <Stack direction="row" alignItems="center" sx={{width: "100%"}}>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<DeleteOutlineIcon />}
        sx={{
          borderColor: "black",
          color: "black",
          paddingX: 3,
          paddingY: "4px",
          width: "100%",
        }}>
        <Typography variant="body2" >
          Delete
        </Typography>
      </Button>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm to delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to delete this post</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" onClick={() => handleClickDelete()}>
            Yes, sure
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default PostDelete;

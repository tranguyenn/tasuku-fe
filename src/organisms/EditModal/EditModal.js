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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditTask({ handleClose, open, column, content }) {
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
  const handleCancel = () => {
    setShow(false);
    setComment("");
    setDisable(true);
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
        <Grid2 container justifyContent="space-between" alignItems="center" sx={{marginRight:1,marginBottom:1,marginTop:"5px"}}>
        <Typography variant="h4" sx={{marginLeft:1, textTransform:"uppercase",fontWeight:"bold"}}>{content} </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            backgroundColor: "black",
            color: "white"
          }}
        >
          <CloseIcon />
        </IconButton>
        </Grid2>
        <DialogContent dividers>
          {/* <Box sx={{flexGrow:1}}>
            
                <img alt="thumbnail" src="https://picsum.photos/1920/1080" height={220} width="100%" style={{borderRadius:"16px"}}/>
            
          </Box> */}
          <Box>
            <Grid2>
              <Box>
                <img
                  alt="thumbnail"
                  src="https://picsum.photos/1920/1080"
                  width="100%"
                  height={200}
                  style={{ borderRadius: "16px", marginTop: "36px" }}
                />
              </Box>
              <Box sx={{ marginTop: 2, flexGrow: 1 }}>
                <Grid2 container justifyContent="space-between" spacing={3}>
                  <Grid2 size={8}>
                    <Typography>Task name: {content} </Typography>
                    <Typography>In List: {column} </Typography>
                    <Grid2 container alignItems="center">
                      <DescriptionRoundedIcon />
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Desciption
                      </Typography>
                    </Grid2>
                    <Typography>Lorem ipsum dolor sit.</Typography>
                    <Grid2>
                      <Grid2 container alignItems="center">
                        <NotesIcon />
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          Activity
                        </Typography>
                      </Grid2>
                      <Box>
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
                      </Box>

                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                    </Grid2>
                  </Grid2>
                  <Grid2 size={4} sx={{ paddingLeft: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AccountCircleSharpIcon />
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Action
                      </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{ marginTop: 2 }}>
                      <Button
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
                      </Button>
                      <Button
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
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                          borderColor: "black",
                          color: "black",
                          paddingX: 3,
                          paddingY: "4px",
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={handleClose}
            sx={{ backgroundColor: "black" }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

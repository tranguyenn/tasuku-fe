import { IconButton, Stack, Typography } from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React from "react";

function CommentReaction() {
  //const dispatch = useDispatch();

  const handleClick = (emoji) => {
    // dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
    console.log("click")
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleClick("like")}
        sx={{ color: "primary.main" }}
      >
        <ThumbUpRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2" mr={1}>
        3
      </Typography>

      <IconButton
        onClick={() => handleClick("dislike")}
        sx={{ color: "error.main" }}
      >
        <ThumbDownAltRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">4</Typography>
    </Stack>
  );
}

export default CommentReaction;
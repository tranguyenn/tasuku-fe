import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import CommentReaction from "./CommentReaction";
import CommentDelete from "./CommentDelete";



function CommentCard() {
  return (
    <Stack direction="row" spacing={2} sx={{marginY:2}}>
      <Avatar alt="avatar" src="https://picsum.photos/200" />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        Username
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            Today
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lorem ipsum dolor sit.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentDelete />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
import React from "react";
import BoardCard from "../../molecules/Card";
import { Box, Grid2, Typography } from "@mui/material";

function HomePage() {
  const board = [
    {
      boardId: 1,
      boardName: "Board 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      boardId: 2,
      boardName: "Board 2",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    },
    {
      boardId: 3,
      boardName: "Board 3",
      content:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
    },
  ];
  return (
    <div>
      <Box sx={{ marginX: "auto", width: "80%" }}>
      <Typography variant="h6" align="left" sx={{marginTop:"20px",marginBottom:"10px"}}>
        Public Boards
      </Typography>
        <Grid2 container spacing={2}>
          {board.map((b, index) => (
            <BoardCard
              key={index}
              boardId={b.boardId}
              content={b.content}
              boardName={b.boardName}
            />
          ))}
        </Grid2>
      </Box>
    </div>
  );
}

export default HomePage;

import React, { useEffect } from "react";
import BoardCard from "../../molecules/Card";
import { Box, Grid2, Typography } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBoards } from "../../features/board/boardSlice";
import { useState } from "react";


function HomePage() {
  const board = [
    {
      _id: 1,
      name: "Board 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      _id: 2,
      name: "Board 2",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    }
  ];
  let userId="671b6770a8e5d8a75c718ad4";
  const [data, setData] = React.useState(board);

  const {
    isLoading,
    error,
    boardByUserId
  }=useSelector(
    (state) => ({
      isLoading: state.board.isLoading,
      error: state.board.error,
      boardByUserId: state.board.boardByUserId
    }),
    shallowEqual
  )
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getBoards({ userId }));
  }, [userId, dispatch]);

  useEffect(() => {
    if (Object.keys(boardByUserId).length !== 0) {
      setData(boardByUserId);
    }
  }, [boardByUserId]);

  return (
    <div>
      <Box sx={{ marginX: "auto", width: "80%" }}>
      <Typography variant="h6" align="left" sx={{marginTop:"20px",marginBottom:"10px"}}>
        Public Boards
      </Typography>
        <Grid2 container spacing={2} >
          {data.map((b, index) => (
            <Grid2 size={{ xs: 12,sm:6, md: 4, lg: 3  }} display="flex" justifyContent="center" alignItems="center">
            <BoardCard
            key={b._id}
            boardId={b._id}
            content={b.description}
            boardName={b.name}
            users={b.users}
            />
            </Grid2>
            
          ))}
        </Grid2>
      </Box>
    </div>
  );
}

export default HomePage;

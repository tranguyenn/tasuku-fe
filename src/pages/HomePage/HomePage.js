import React, { useEffect } from "react";
import BoardCard from "../../molecules/Card";
import { Box, Button, Card, Grid2, Typography } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBoards } from "../../features/board/boardSlice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import "../../molecules/Card.css";
import AddBoardModal from "../../organisms/AddBoardModal/AddBoardModal";

function HomePage() {
  const { user } = useAuth();
  console.log("user", user);
  let userId = user._id;
  const [data, setData] = React.useState();

  const { isLoading, error, boardByUserId } = useSelector(
    (state) => ({
      isLoading: state.board.isLoading,
      error: state.board.error,
      boardByUserId: state.board.boardByUserId,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getBoards({ userId }));
  }, [userId, dispatch]);

  useEffect(() => {
    if (Object.keys(boardByUserId).length !== 0) {
      setData(boardByUserId);
    }
  }, [boardByUserId]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box sx={{ marginX: "auto", width: "80%" }}>
        <Typography
          variant="h6"
          align="left"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        >
          Public Boards
        </Typography>

        <Grid2 container spacing={2}>
          <Grid2
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              sx={{
                maxWidth: 350,
                minWidth: 250,
                width: "100%",
                height: "100%",
                margin: "3px",
                backgroundColor: "rgb(240, 240, 240)",
                // backgroundImage:
                //   "radial-gradient(circle, #bdbdbd, #cdcdcd, #dedede, #eeeeee, #ffffff);",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="cardEffect"
            >
              <Button
                onClick={handleClickOpen}
                sx={{
                  height: "85%",
                  color: "text.secondary",
                  borderColor: "rgb(180, 180, 180)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                }}
              >
                {" "}
                <Typography width="80%" fontWeight="bold">
                  Create new project
                </Typography>
                <AddIcon sx={{ fontSize: 50 }} />
              </Button>
              <AddBoardModal
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
              />
            </Card>
          </Grid2>
          {data ? (
            data.map((b, index) => (
              <Grid2
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <BoardCard
                  key={b._id}
                  boardId={b._id}
                  content={b.description}
                  boardName={b.name}
                  users={b.users}
                  boarCover={b.cover}
                />
              </Grid2>
            ))
          ) : (
            <>
              <Typography
                variant="h6"
                align="left"
                sx={{ marginTop: "20px", marginBottom: "10px" }}
              >
                You don't have any boards
              </Typography>
            </>
          )}
        </Grid2>
      </Box>
    </div>
  );
}

export default HomePage;

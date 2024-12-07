import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Avatar, Box, Grid2, Paper, styled, Typography } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { deepOrange, green, grey } from "@mui/material/colors";
import "./SubBar.css";
import Sidebar from "../Sidebar/Sidebar";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBoardName } from "../../features/board/boardSlice";

export default function SubBar({ boardId }) {
  const [boardMemberList, setBoardMemberList] = React.useState([]);
  const { boardMemeber } = useSelector(
    (state) => ({
      boardMemeber: state.board.boardMemeber,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (boardId) dispatch(getBoardName({ boardId }));
  }, [boardId, dispatch]);

  useEffect(() => {
    if (boardMemeber) {
      setBoardMemberList(boardMemeber);
    }
  }, [boardMemeber]);
  console.log("board member", boardMemberList);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  return (
    <Box sx={{ flexGrow: 1, paddingY: "10px" }} paddingTop={1} paddingX={2}>
      <Grid2
        container
        spacing={2}
        columns={16}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid2
          size={7}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            variant="contained"
            className="buttonHover"
            sx={{ marginRight: "3px", backgroundColor: "black",minWidth:"40px"}}
          >
            {" "}
            <PublicOutlinedIcon />
            <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
              Public
            </Typography>
          </Button>
          {boardMemberList?.map((m) => (
            <Avatar
              sx={{ bgcolor: grey[500], marginRight: "5px" }}
              variant="rounded"
              src={m.avatar}
            ></Avatar>
          ))}
        </Grid2>
        <Grid2 size={7} display={"flex"} justifyContent={"flex-end"}>
          <Sidebar boardId={boardId} />
        </Grid2>
      </Grid2>
    </Box>
  );
}

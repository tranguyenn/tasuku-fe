import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Avatar, Box, Grid2, Paper, styled } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { deepOrange, green } from "@mui/material/colors";
import "./SubBar.css";
import Sidebar from "../Sidebar/Sidebar";

export default function SubBar() {
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
    <Box sx={{ flexGrow: 1,paddingY:"10px" }} paddingTop={1} paddingX={2}>
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
          <Button variant="contained" className="buttonHover" sx={{ marginRight: "3px",backgroundColor:"black" }}>
            {" "}
            <PublicOutlinedIcon />
            Public
          </Button>
          <Avatar
            sx={{ bgcolor: green[500] }}
            variant="rounded"
            src="https://picsum.photos/200"
          ></Avatar>
        </Grid2>
        <Grid2 size={7} display={"flex"} justifyContent={"flex-end"}>
          <Sidebar/>
        </Grid2>
      </Grid2>
    </Box>
  );
}

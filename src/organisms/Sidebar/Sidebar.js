import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "./Sidebar.css";
import { Avatar, Grid2, IconButton, Stack, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../AddTeamMember/Dialog";

export default function Sidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        top: 66,
        padding: 2,
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid2
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Menu
        </Typography>
        <IconButton onClick={toggleDrawer("right", false)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Grid2>
      <Divider />
      <Box sx={{ marginTop: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccountCircleSharpIcon />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Made by
          </Typography>
        </Stack>
        <Grid2 sx={{ marginTop: 1 }} container spacing={2} alignItems="center">
          <Avatar alt="Remy Sharp" variant="rounded" src="../people-1.jpg" />
          <Grid2 direction="row">
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Username
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontStyle: "italic" }}
              gutterBottom
            >
              @Username
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ marginTop: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <DescriptionRoundedIcon />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Desciption
          </Typography>
        </Stack>
        <Grid2 sx={{ marginTop: 1 }} container spacing={2} alignItems="center">
          <Typography variant="body2" align="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            unde nostrum numquam blanditiis sit architecto doloribus dolor non
            quo laudantium.
          </Typography>
        </Grid2>
      </Box>
      <Box sx={{ marginTop: 3 }}>
        <Grid2 container alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <GroupsIcon />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Team
            </Typography>
          </Stack>
          <IconButton sx={{color:"black"}} onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Grid2>

        <Grid2
          sx={{ marginTop: 1 }}
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid2 container alignItems="center" spacing={1}>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src="../people-1.jpg"
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Username
            </Typography>
          </Grid2>
          <Typography variant="body2"> Admin</Typography>
        </Grid2>
      </Box>
      <FormDialog handleClose={handleClose} open={open}/>
    </Box>
  );

  return (
    <div>
      <Button
        variant="outlined"
        onClick={toggleDrawer("right", true)}
        sx={{
          borderColor: "black",
          color: "black",
          paddingX: 3,
          paddingY: "2px",
        }}
      >
        Menu
      </Button>
      <Drawer
        anchor="right"
        open={state["right"]}
        //variant="permanent"
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}

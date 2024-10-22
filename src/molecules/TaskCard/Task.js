import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Draggable } from "react-beautiful-dnd";
import "./Task.css";
import { Box, Button, Grid2, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditTask from "../../organisms/EditModal/EditModal";

export default function Task({ taskId, index, content,column }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Draggable key={taskId} draggableId={`${taskId}`} index={index}>
        {(provided, snapshot) => (
          <Card
            sx={{ width: 345, borderRadius: "16px" }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            //isDragging={snapshot.isDragging}
            className={snapshot.isDragging ? "onDrag" : ""}
          >
            <Box sx={{ padding: "15px", paddingBottom: 0 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://picsum.photos/200/300"
                alt="green iguana"
              />
            </Box>

            <CardContent>
              <Grid2
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid2>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                  >
                    {content}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    align="left"
                  >
                    {content}
                  </Typography>
                </Grid2>
                <Grid2>
                  <IconButton className="editEffect" sx={{ color: "black" }} onClick={handleClickOpen}>
                    <EditIcon />
                  </IconButton>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        )}
      </Draggable>
      <EditTask handleClose={handleClose} open={open} column={column} content={content}/>
    </div>
  );
}

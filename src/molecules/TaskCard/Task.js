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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export default function Task({
  taskId,
  index,
  content,
  column,
  taskName,
  cover,
  boardId,
}) {
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
        
            sx={{ borderRadius: "16px", width:"30vw", maxWidth: 350, minWidth: 280 }}
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
                image={cover ? cover : "https://picsum.photos/200/300"}
                alt="green iguana"
              />
            </Box>

            <CardContent>
              <Grid2
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid2 size={12}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                  >
                    {taskName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    align="left"
                  >
                    {content}
                  </Typography>
                </Grid2>
                <Grid2 offset={{ xs: "auto" }}>
                  <Button
                    className="editEffect"
                    sx={{
                      alignItems: "center",
                      color: "text.secondary",
                      borderColor: "text.secondary",
                      fontSize: "12px",
                      padding: "2px",
                    }}
                    onClick={handleClickOpen}
                    variant="outlined"
                  >
                    Open
                   <OpenInNewIcon sx={{fontSize: 12, paddingLeft: "2px"}}/>
                  </Button>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        )}
      </Draggable>
      <EditTask
        handleClose={handleClose}
        open={open}
        boardId={boardId}
        column={column}
        content={content}
        taskName={taskName}
        cover={cover}
        taskId={taskId}
      />
    </div>
  );
}

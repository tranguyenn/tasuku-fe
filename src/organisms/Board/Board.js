import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Button, Grid2, IconButton, Stack, Typography } from "@mui/material";
import TaskCard from "../../molecules/Card";
import "./Board.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Task from "../../molecules/TaskCard/Task";
import AddIcon from "@mui/icons-material/Add";
import TaskDialog from "../TaskDialog/TaskDialog";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTask, updateTask } from "../../features/task/taskSlice";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const initialData = {
  tasks: {
    "task-2": { id: "task-2",name:"Name-task", content: "Watch my favorite show" },
    "task-1": { id: "task-1",name:"Name-task", content: "Take out the garbage" },
    "task-3": { id: "task-3",name:"Name-task", content: "Charge my phone" },
    "task-4": { id: "task-4",name:"Name-task", content: "Cook dinner" },
    "task-5": { id: "task-5",name:"Name-task", content: "Go to bed" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Pending",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Review",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default function Board({ boardId }) {
  const [data, setData] = React.useState(initialData);

  const { isLoading, error, taskList } = useSelector(
    (state) => ({
      isLoading: state.task.isLoading,
      error: state.task.error,
      taskList: state.task.taskList,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (boardId) dispatch(getTask({ boardId }));
  }, [boardId, dispatch]);

  useEffect(() => {
    if (taskList) {
      setData(taskList);
    }
  }, [taskList]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("destination",destination);
    console.log("source",source);
    console.log("dragg",draggableId);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableld &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    console.log("start", start);
    console.log("finish", finish===start);  
    console.log("drag data",data)
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }
    const dataEdit={
      taskId: draggableId,
      status: finish.title.toLowerCase(),
      boardId: boardId
    }
    console.log("update status data",dataEdit)
    dispatch(updateTask(dataEdit));

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          flexGrow: 1,
          paddingX: "10px",

          marginX: "10px",
          borderRadius: "16px",
          minHeight: "85vh",
          overflowX:"auto",
          // position:"relative",
          whiteSpace: "nowrap",
          
        }}
      >
        <Grid container spacing={3} className="testcolumn" width="1650px" >
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Grid
                size={3}
                 maxWidth={{xs:"320px"}}
                container
                direction="column"
                sx={{
                  paddingTop: "10px",
                  backgroundColor: "#f0f0f0",
                  paddingX: 3,
                  borderRadius: "16px",
                }}
                key={column.id}
              >
                <Grid2
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" sx={{ textAlign: "left" }} {}>
                    {column.title}
                  </Typography>

                  <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ alignItems: "center", backgroundColor: "black" }}
                    display={{xs:"none"}}
                  >
                    Task
                  </Button>
                  <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ alignItems: "center", backgroundColor: "black" }}
                  >
                    sm
                  </Button>
                  <TaskDialog
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    boardId={boardId}
                  />
                </Grid2>

                <Droppable droppableId={column.id} key={column.id} type="group">
                  {(provided, snapshot) => (
                    <Stack
                      spacing={1}
                      direction="column"
                      useFlexGap
                      sx={{
                        padding: "10px",
                        // overflow: "auto",
                        flexShrink: 0,
                        flexGrow: 1,
                        minHeight: "75vh",
                        alignItems: "center",
                      }}
                      className={`scrollbar  ${
                        snapshot.isDraggingOver ? "isDragOver" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasks?.map((task, index) => (
                        <Task
                          taskId={task.id}
                          boardId={boardId}
                          taskName={task.name}
                          index={index}
                          key={task.id}
                          content={task.content}
                          cover={task.cover}
                          column={column.title}
                          noWrap
                        />
                      ))}
                      {provided.placeholder}
                    </Stack>
                  )}
                </Droppable>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </DragDropContext>
  );
}

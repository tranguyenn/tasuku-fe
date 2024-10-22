import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import "./Card.css";
import { Avatar, AvatarGroup } from "@mui/material";

export default function BoardCard({ boardId, content, boardName }) {
  return (
    <Card sx={{ maxWidth: 345 }} className="cardEffect">
      <CardActionArea href={`/board-detail/${boardId}`}>
        <div style={{ padding: "15px", paddingBottom: 0 }}>
          <CardMedia
            component="img"
            height="150"
            image="https://picsum.photos/200/300"
            alt="green iguana"
            className="card-media"
          />
        </div>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="left">
            Board {boardId} {boardName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
            }}
          >
            {content}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              paddingX: 4,
              paddingY: "4px",
            }}
            variant="contained"
          >
            Join
          </Button>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="../people-1.jpg" />
            <Avatar alt="Travis Howard" src="../people-2.jpg" />
            <Avatar alt="Cindy Baker" src="../people-3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

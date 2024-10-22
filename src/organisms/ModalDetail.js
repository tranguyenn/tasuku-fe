import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, AvatarGroup, Card, CardMedia } from "@mui/material";
import './ModalDetail.css'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius:"10px",
  p: 4,
};

export default function ModalDetail() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
          <Card  className="card-container" >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="../example-task.jpg"
              className="card-media"
            />
            <Typography gutterBottom component="div" className="card-title">
              Lizard
            </Typography>
            <div className="people-container">
              <AvatarGroup
                max={5}
                className="card-avatar-group"
                renderSurplus={(surplus) => (
                  <div className="surplus-fix">
                    +{surplus.toString()[0]}more
                  </div>
                )}
              >
                <Avatar alt="Remy Sharp" src="../people-1.jpg" />
                <Avatar alt="Travis Howard" src="../people-2.jpg" />
                <Avatar alt="Cindy Baker" src="../people-3.jpg" />
                <Avatar alt="Cindy Baker" src="../people-3.jpg" />
              </AvatarGroup>
              {"a" === "a" && (
                <Typography className="people-more">
                  + 2 more in task
                </Typography>
              )}
            </div>
            <div className="input-container">
              <div className="left-input">adb</div>
              <div className="right-input">dgfds</div>
            </div>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

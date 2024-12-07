import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid2, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { shallowEqual, useDispatch } from "react-redux";
import { addMemberToBoard } from "../../features/task/taskSlice";
import FTextField from "../form/FTextField";
import { searchUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Input is required"),
});

export default function FormDialog({ handleClose, open, boardId }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
  });
  const [searchResults, setSearchResults] = React.useState([]);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const { isLoading, error, listUser } = useSelector(
    (state) => ({
      isLoading: state.user.isLoading,
      error: state.user.error,
      listUser: state.user.listUser,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (listUser) {
      setSearchResults(listUser.data);
    }
  }, [listUser]);
  const onSubmit = (data) => {
    console.log("submit dialog", boardId);
    const searchTerm = data.name; //

    dispatch(searchUser(searchTerm)) // Use correct search term
      .then(() => {reset()})
      .catch((error) => {
        console.error("Error during search user:", error);
      });
  };

  const handleAddMember = (email) => {
    console.log("check truyen email", email);
    // Dispatch the action to add the member to the board
    dispatch(addMemberToBoard({ boardId, email }))
    .then(() => {setSearchResults([]);reset();handleClose()})
    .catch((error) => {
      console.error("Error during search user:", error);
    });
  };
 const handleCloseDialog=()=>{
  setSearchResults([]);
  handleClose();
 }
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <Grid2
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingRight: 2 }}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Invite to Workspace
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
        </Grid2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <FTextField
                name="name"
                multiline
                fullWidth
                rows={1}
                placeholder="Enter name or email"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                  },
                }}
              />
              {/* Display search results */}
              {searchResults?.length > 0 ? (
                searchResults.map((user) => {
                  if(user.boards?.includes(boardId)){
                    return (<></>)
                  }
                  return (
                    <div key={user._id} style={{ marginTop: "5px", display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <div>
                        <p>
                        Name: {user.name}
                        </p>
                        <p>
                         Email:  {user.email}
                        </p>
                        
                      </div>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 2,backgroundColor: "gray" , height:"60%"}}
                        onClick={() => handleAddMember(user.email)}
                      >
                        Add to Board
                      </Button>
                    </div>
                  );
                })
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 2 }}
                >
                  No results found
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "black" }}
              >
                Search
              </Button>
              <Button onClick={handleCloseDialog} sx={{ color: "black" }}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
}

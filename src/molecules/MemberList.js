import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "./MemberList.css"
import { Typography } from '@mui/material';

export default function MemberList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, fontSize:"30px"}}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="../people-1.jpg" >
          </Avatar>
        </ListItemAvatar>
        <Typography className='member-name'>Remy Sharp</Typography>
      </ListItem>
   
    </List>
  );
}

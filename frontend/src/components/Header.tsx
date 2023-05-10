import React from "react";
import {AppBar, Avatar, Box, IconButton, Toolbar} from "@mui/material";

export const Header = () => (
  <AppBar position="relative" color="primary">
    <Toolbar>
      <IconButton>
        <h4 style={{color: 'white'}}>Lightning Talk</h4>
      </IconButton>
      <Box sx={{flexGrow: 1}}></Box>
      <Box sx={{flexGrow: 0}}>
        <IconButton sx={{p: 0}}>
          <Avatar alt="avatar">S</Avatar>
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
)
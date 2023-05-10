import React, {useCallback, useState} from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer, IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {Info as InfoIcon, MoreVert} from '@mui/icons-material';
import {ImpressDialog} from './ImpressDialog';

export const Footer = () => {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [openImpress, setOpenImpress] = useState<boolean>(false);

  const handleOpenImpress = useCallback(() => {
    setOpenImpress(true)
  }, [setOpenImpress])
  return (<>
    <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} anchor="bottom">
      <Box
        sx={{width: 'auto'}}
        role="presentation"
        onClick={() => setShowDrawer(false)}
      >
        <List>
          <ListItem disablePadding onClick={handleOpenImpress}>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon/>
              </ListItemIcon>
              <ListItemText>
                <Typography style={{fontWeight: 'bold'}}>Impressum</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider/>
        </List>
      </Box>
    </Drawer>
    <ImpressDialog open={openImpress} onClose={() => setOpenImpress(false)}/>

    <AppBar position="absolute" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Box sx={{flexGrow: 1}}></Box>
        <Box sx={{flexGrow: 0}}>
          <IconButton sx={{p: 0}} onClick={() => setShowDrawer(true)}>
            <MoreVert style={{color: 'white'}} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  </>);
};

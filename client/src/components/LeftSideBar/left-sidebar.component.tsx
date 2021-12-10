import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import {Button, Box, IconButton, Hidden} from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatIcon from '@mui/icons-material/Chat';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import AddPostModal from "../AddPostModal/add_post_modal.component";
import { QUERY_FRIEND_REQUESTS } from '../../utils/queries';
import { useAppSelector } from '../../app/hooks';
import { useQuery } from '@apollo/client';

type userProps = {
  id: string,
  handle: string,
  avatar: string
}
const LeftSidebar = () => {
  const currentUser = useAppSelector(state => state.currentUser)
  const { user }: { user: userProps } = currentUser
  if (currentUser) {
      var { loading, error, data } = useQuery(QUERY_FRIEND_REQUESTS, {
          variables: {
              id: user.id
          },
          // pollInterval: 1000
      });
  }
  if (data) {
      var friendRequestsData = data.friendRequests
  }

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box sx = {{minWidth:'40px'}} >
        <List>
          <NavLink
            to="/home/feed"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    fontFamily: 'inherit'
                  }}
                  primary="HOME"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          {/* <NavLink
            to={`/home/explore`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <TagIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Explore"
                />
              </Hidden>
            </ListItem>
          </NavLink> */}
          <NavLink
            to={`/home/crypto`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <AccountBalanceIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    fontFamily: 'inherit'
                  }}
                  primary="CRYPTO"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to={`/home/requests`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <NotificationAddIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  // sx={{ minWidth: '0'}}
                  primaryTypographyProps={{
                    fontSize: "18px",
                    fontFamily: 'inherit'
                  }}
                  secondaryTypographyProps={{
                    color: 'red',
                    fontSize: "18px",
                    fontWeight: 'bold'
                  }}
                  primary="FRIEND REQUESTS"
                  secondary={friendRequestsData?.length ? `(${friendRequestsData?.length})` : ""}
                />
              </Hidden>
            </ListItem>
          </NavLink>
          {/* <NavLink
            to={`/home/notifications`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <NotificationsNoneIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Notifications"
                />
              </Hidden>
            </ListItem>
          </NavLink> */}

          <NavLink
            to={`/home/messages`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <MailOutlineIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    fontFamily: 'inherit'
                  }}
                  primary="MESSAGES"
                />
              </Hidden>
            </ListItem>
          </NavLink>

          {/* <NavLink
            to={`/home/chat`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <ChatIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Chat"
                />
              </Hidden>
            </ListItem>
          </NavLink> */}

          <NavLink
            to={`/home/profile`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                // margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    fontFamily: 'inherit'
                  }}
                  primary="PROFILE"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <Hidden lgDown>
            <Button
              onClick={handleModalOpen}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "28px",
                padding: "10px",
                fontFamily: 'inherit',
                background: "black",
                "&:hover": {
                  background: "#333",
                },
              }}
            >
              POST
            </Button>
          </Hidden>
          <Hidden lgUp>
            <IconButton
              onClick={handleModalOpen}
              sx={{
                borderRadius: "28px",
                marginLeft: '8px'
                // padding: "10px",
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Hidden>
        </List>
      </Box>
      {openModal && (
        <AddPostModal
          open={openModal}
          handleClose={handleModalClose}
        />
      )}
    </>
  );
}

export default LeftSidebar;
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link as RouteLink } from "react-router-dom";
const Moment = require('moment')
import { Fade } from "@mui/material";
import { QUERY_USER } from '../../../utils/queries';
import { DELETE_MESSAGE } from '../../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { userProps } from '../../../index.types';
import { useAppSelector } from '../../../app/hooks';
import Avatar from '@material-ui/core/Avatar';
import SingleMessageLoading from './single_message_loading.component';

type MsgProps = {
  msgId: string,
  senderId: string,
  sentAt: string,
  text: string
}
const SingleMessage = ({ msgId, senderId, sentAt, text }: MsgProps) => {

  const currentUser = useAppSelector(state => state.currentUser)
  const { user } = currentUser
  const loggedInUser: userProps = user

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: senderId }
  });
  if (data) {
    var { userProfile }: { userProfile: userProps } = data;
  }
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const [deleteMessage, { }] = useMutation(DELETE_MESSAGE);
  const handleDeletePost = async () => {
    try {
      await deleteMessage({
        variables: { id: msgId }
      })
      setAnchorEl(null);
    } catch (e) {
      throw new Error('Unable to delete message')
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* {(loading || error || !userProfile.avatar) && (
        <SingleMessageLoading />
      )} */}
      {userProfile && (
        <Box
          padding="1rem"
          width='100%'
          sx={{
            marginTop: '10px',
            marginBottom: '10px',
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: "1rem" }}>
              <RouteLink to={`/home/profile/${userProfile.id}`}>
                <Avatar alt="logo" src={userProfile.avatar} />
              </RouteLink>
            </Grid>
            <Box width='100%' >
              <Grid
                width='100%'
              >
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                  <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                    {userProfile.handle}
                  </Typography>
                  <Typography ml='0.25rem' fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                    @{userProfile.handle.trim().replace(/ /g,'').toLowerCase()}
                  </Typography>
                  <Typography fontFamily='inherit' sx={{ marginLeft: 'auto', fontSize: "15px", color: "#555" }}>
                    {Moment(sentAt).format('llll')}
                  </Typography>
                  <Grid item>
                    {loggedInUser.id === userProfile.id && (
                      <IconButton
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(e);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletePost();
                        }}
                      >
                        DELETE
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Box>
                <Box>
                  <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                    {text}
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default SingleMessage;
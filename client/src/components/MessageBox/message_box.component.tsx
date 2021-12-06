import React from 'react';
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_MESSAGES } from '../../utils/queries';
import Avatar from '@material-ui/core/Avatar';

type MessageProps = {
  msgId: string,
  msgHandle: string,
  msgAvatar: string,
  currentUser: string
}
const MessageBox = ({ msgId, msgHandle, msgAvatar, currentUser }: MessageProps) => {

  const { loading, error, data } = useQuery(QUERY_MESSAGES, {
    variables: { sender_id: currentUser, receiver_id: msgId },
  });
  if (data) {
    var { messages } = data;
  }

  return (
    <>
      <Link
        to={`/home/messages/${msgId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
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
              <Avatar alt="logo" src={msgAvatar} />
            </Grid>
            <Box width='100%' >
              <Grid
                container
              // justifyContent="space-between"
              // alignItems="center"
              // flexWrap="nowrap"
              // width='100%'
              >
                <Grid width='100%'
                >
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                    <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                      {msgHandle}
                    </Typography>
                    <Typography ml='0.25rem' fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                      @{msgHandle.trim().toLowerCase()}
                    </Typography>
                    <Typography fontFamily='inherit' sx={{ marginLeft: 'auto', fontSize: "15px", color: "#555" }}>
                      Seen
                    </Typography>
                  </Box>
                  <Box>
                    {messages && (
                      <Typography fontFamily='inherit'
                        sx={{
                          fontSize: "15px",
                          color: "#555",
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1,
                        }}
                      >
                        {messages[messages.length - 1].text}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Link>
    </>
  )
}

export default MessageBox
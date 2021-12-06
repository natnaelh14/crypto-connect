import React from 'react';
import { Fade, Typography } from "@mui/material";

const ChatPage = () => {

  return (
    <div style={{ width: '66%', margin: '20px' }}>
      <Fade in={true} timeout={1000}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: "90vh", border: '1px solid #cdcdcd', padding: '20px' }}>
          <Typography textAlign='center' variant="h5" sx={{ color: 'red' }}>Chat Feature is Coming Soon</Typography>
          <img src='https://res.cloudinary.com/doalzf6o2/image/upload/v1638071766/istockphoto-1139968862-612x612_w4okv6.jpg' alt='construction-image'></img>
        </div>
      </Fade>
    </div>
  )
}

export default ChatPage;
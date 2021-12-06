import React, { useEffect } from 'react';
import { Fade, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MessageBox from '../components/MessageBox/message_box.component';
import { useQuery } from '@apollo/client';
import { QUERY_MESSENGERS, QUERY_MESSAGES } from '../utils/queries';
import { userProps } from '../index.types';
import { useAppSelector } from '../app/hooks';
import MessageBoxLoading from '../components/MessageBox/message_box_loading.component';
import { MessagesContainer } from './styles/message_page.styles';

const MessagePage = () => {

  const currentUser = useAppSelector(state => state.currentUser)
  const { loading: userLoading, user } = currentUser
  const userInfo: userProps = user
  const { loading, error, data } = useQuery(QUERY_MESSENGERS, {
    variables: { id: userInfo.id },
  });
  if (data) {
    var { messengers } = data;
  }

  return (
    <MessagesContainer>
      <Fade in={true} timeout={1000}>
        <div style={{ border: '1px solid #cdcdcd', height: "90vh", padding: '20px' }}>
          <Typography fontFamily='inherit' variant='h5' textAlign='center' >Messages</Typography>
          <Box
            paddingBottom=".5rem"
            paddingTop=".5rem"
            marginTop='0.5rem'
            borderTop="1px solid #ccc"
          >
            {(loading || userLoading || error) && (
              <>
                <MessageBoxLoading />
                <MessageBoxLoading />
                <MessageBoxLoading />
                <MessageBoxLoading />
              </>
            )}
            {messengers && (
              messengers.map((msg: any) => {
                return <MessageBox key={msg.id} currentUser={userInfo.id} msgId={msg.id} msgHandle={msg.handle} msgAvatar={msg.avatar} />
              })
            )}
          </Box>
        </div>
      </Fade>
    </MessagesContainer>
  )
}

export default MessagePage;
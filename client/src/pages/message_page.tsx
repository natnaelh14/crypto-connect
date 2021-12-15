import React, { useEffect } from 'react';
import { Fade, Typography, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import MessageBox from '../components/MessageBox/message_box.component';
import { useQuery } from '@apollo/client';
import { QUERY_MESSENGERS } from '../utils/queries';
import { userProps } from '../index.types';
import { useAppSelector } from '../app/hooks';
import MessageBoxLoading from '../components/MessageBox/message_box_loading.component';
import { MessagesContainer } from './styles/message_page.styles';
import AddNewMessageModal from '../components/AddNewMessageModal/AddNewMessageModal.component';
import RefreshIcon from '@mui/icons-material/Refresh';

const MessagePage = () => {

  const currentUser = useAppSelector(state => state.currentUser)
  const { loading: userLoading, user } = currentUser
  const userInfo: userProps = user

  let { loading, error, data, refetch } = useQuery(QUERY_MESSENGERS, {
    variables: { id: userInfo.id }
  });

  if (data) {
    var { messengers } = data;
  }

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false)
  };

  const getMessages = () => {
    refetch()
  }

  useEffect(() => {
    refetch()
  }, [])

  return (
    <MessagesContainer>
      <Fade in={true} timeout={1000}>
        <div style={{ border: '1px solid #cdcdcd', height: "90vh", padding: '20px' }}>
          <Typography fontFamily='inherit' variant='h5' textAlign='center' >Messages</Typography>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              size="small"
              onClick={() => setOpenModal(true)}
              sx={{
                textTransform: "capitalize",
                fontFamily: 'inherit',
                borderRadius: "12px",
                marginLeft: 'auto',
                padding: "10px",
                fontSize: '15px',
                mt: "4px",
                background: "black",
                "&:hover": {
                  background: "#333",
                },
              }}
              variant="contained"
            >
              SEND MESSAGE
            </Button>
          </Box>
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
              <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                <IconButton size="medium" onClick={getMessages} >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
            {messengers && (
              messengers.map((msg: any) => {
                return <MessageBox key={msg.id} currentUser={userInfo.id} msgId={msg.id} msgHandle={msg.handle} msgAvatar={msg.avatar} />
              })
            )}
          </Box>
        </div>
      </Fade>
      {openModal && (
        <AddNewMessageModal
          open={openModal}
          handleClose={handleModalClose}
          messagesRefresh={refetch}
        />
      )}
    </MessagesContainer>
  )
}

export default MessagePage;
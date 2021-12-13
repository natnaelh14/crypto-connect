import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@material-ui/icons/Send';
import { QUERY_ALL_USERS, QUERY_MESSENGERS } from '../../utils/queries';
import { ADD_MESSAGE } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useAppSelector } from '../../app/hooks';
import { userProps } from '../../index.types';
import Avatar from '@material-ui/core/Avatar';
import noAvatar from '../../img/no-avatar.png';

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    messagesRefresh: () => void
}

const AddNewMessageModal = ({ open, handleClose, messagesRefresh }: ModalProps) => {
    const currentUser = useAppSelector(state => state.currentUser)
    const { error: currentUserError, loading: currentUserLoading, user } = currentUser
    const userInfo: userProps = user

    const { loading, error, data } = useQuery(QUERY_ALL_USERS, {
        variables: { id: userInfo.id }
    });
    const [addMessage, { }] = useMutation(ADD_MESSAGE, {
        refetchQueries: [
            { query: QUERY_MESSENGERS }
        ]
    })
    const [messageText, setMessageText] = useState("");
    const [receiver, setReceiver] = useState("");

    const handleSendMessage = () => {
        try {
            if (messageText && receiver) {
                addMessage({
                    variables: {
                        text: messageText,
                        sender_id: userInfo.id,
                        receiver_id: receiver
                    },
                }).then(() => {
                    messagesRefresh()
                    setMessageText("")
                    setReceiver("")
                    handleClose()
                })
            };

        } catch (e) {
            return e;
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography fontFamily='inherit' textAlign='center' style={{ fontSize: '20px' }}>NEW MESSAGE</Typography>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: '400px' }}>
                <Box mt='4rem'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">TO</InputLabel>
                        <Select
                            id="demo-simple-select"
                            value={receiver}
                            variant="standard"
                            onChange={(e) => setReceiver(e.target.value)}
                            sx={{ fontFamily: 'inherit' }}
                        >
                            {data?.allUsers && (
                                data?.allUsers.map((user: any) => {
                                    return <MenuItem key={user.id} value={user.id}>
                                        <>
                                            <Avatar style={{ width: "30px", height: "30px" }} alt="message-user" src={user?.avatar ? user?.avatar : noAvatar} />
                                            <Typography
                                                sx={{ ml: '50px', mt: '10px', fontSize: "16px", fontWeight: 500, textAlign: "center" }}
                                            >
                                                {user.handle.toUpperCase()}
                                            </Typography>
                                        </>
                                    </MenuItem>
                                })
                            )}
                        </Select>
                    </FormControl>
                </Box>
                <Box mt='2rem'>
                    <TextField
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        variant="filled"
                        label="Send Message..."
                        multiline
                        rows={3}
                        style={{ fontFamily: 'inherit' }}
                        fullWidth
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={handleSendMessage} >
                            <SendIcon style={{ width: 40, height: 40, color: '#000000' }} />
                        </IconButton>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    size="small"
                    sx={{
                        textTransform: "capitalize",
                        padding: "6px 20px",
                        marginBottom: '20px',
                        width: "60%",
                        background: "black",
                        fontFamily: 'inherit',
                        "&:hover": {
                            background: "#333",
                        },
                    }}
                    variant="contained"
                    onClick={handleClose}
                >
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddNewMessageModal;

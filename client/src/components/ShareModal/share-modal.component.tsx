import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@material-ui/icons/Send';
import { ADD_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import noAvatar from '../../img/no-avatar.png';

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    shareText: string,
    currentUserId: string,
    currentUserName: string,
    currentUserAvatar: string,
    textAuthor: string
}

const ShareModal = ({ open, handleClose, shareText, textAuthor, currentUserId, currentUserName, currentUserAvatar }: ModalProps) => {

    const [messageText, setMessageText] = useState<string>(`@${textAuthor}- ${shareText}`);
    const [addPost, { data }] = useMutation(ADD_POST);

    const handleAddPost = async () => {
        await addPost({
            variables: {
                user_id: currentUserId,
                text: messageText
            }
        })
        setMessageText("");
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography fontFamily='inherit' textAlign='center' style={{ fontSize: '20px' }}>SHARE POST</Typography>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: '400px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Avatar style={{ width: "50px", height: "50px" }} alt="message-user" src={currentUserAvatar ? currentUserAvatar : noAvatar} />
                    <Box>
                        <Typography
                            sx={{ fontSize: "16px", fontWeight: 500, textAlign: "center" }}
                        >
                            {currentUserName.toUpperCase()}
                        </Typography>
                        <Typography
                            sx={{ fontSize: "16px", fontWeight: 500, textAlign: "center" }}
                        >
                            @{currentUserName.trim().replace(/ /g, '').toLowerCase()}
                        </Typography>
                    </Box>

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
                        <IconButton onClick={handleAddPost} >
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

export default ShareModal;

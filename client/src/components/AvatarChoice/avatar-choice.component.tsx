import React from 'react'
import { Typography, IconButton, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { avatarsArray } from './avatars';
import Avatar from "@material-ui/core/Avatar";
import { AvatarContainer, SingleAvatar } from './avatar-choice.styles';

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    handleSampleAvatar: (avatar: string) => void
}

const AvatarChoice = ({ open, handleClose, handleSampleAvatar }: ModalProps) => {

    const handleAvatarChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const Button: HTMLButtonElement = e.currentTarget;
        handleSampleAvatar(Button.value)
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography fontFamily='inherit' textAlign='center' style={{ fontSize: '20px' }}>CHOOSE AVATAR</Typography>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: 'auto' }}>
                <AvatarContainer>
                    {avatarsArray.map((photo, i) => {
                        return <SingleAvatar value={photo} onClick={handleAvatarChoice}>
                            <Avatar
                                className='image'
                                key={i}
                                style={{ margin: "0.4rem", height: "75px", width: "75px" }}
                                alt="sample-avatar"
                                src={photo}
                            />
                        </SingleAvatar>
                    })
                    }
                </AvatarContainer>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarChoice;

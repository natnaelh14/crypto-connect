import React, { useState } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { useMutation } from '@apollo/client';
import { UPDATE_FRIEND_REQUEST } from '../../utils/mutations';
import { userProps } from '../../index.types';
import Avatar from '@material-ui/core/Avatar';

type RequestsProps = {
    userId: string,
    userHandle: string,
    userAvatar: string,
    updateRequest: () => void
}

const FriendRequestBox = ({ userId, userHandle, userAvatar, updateRequest }: RequestsProps) => {
    const currentUser = useAppSelector(state => state.currentUser)
    const { user } = currentUser
    const userInfo: userProps = user
    const [respondFollowRequest, { }] = useMutation(UPDATE_FRIEND_REQUEST);
    const [showButton, setShowButton] = useState(true);
    const handleFriendRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const Button: HTMLButtonElement = e.currentTarget;
        await respondFollowRequest({
            variables: {
                sender_id: userId,
                receiver_id: userInfo.id,
                status: Button.value
            }
        }).then(() => {
            updateRequest();
        })
        setShowButton(false)
    }

    return (
        <>
            <Box
                padding="1rem"
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
                        <Link to={`/home/profile/${userId}`}>
                            <Avatar alt="logo" src={userAvatar} />
                        </Link>
                    </Grid>
                    <Box>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            flexWrap="nowrap"
                        >
                            <Grid item>
                                <Box>
                                    <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                        {`${userHandle} is requesting to follow you.`}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        {showButton && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <Button
                                    sx={{ borderRadius: 8, marginRight: "1rem" }}
                                    color='primary'
                                    variant="outlined"
                                    value='CONFIRMED'
                                    onClick={handleFriendRequest}
                                    size="small">APPROVE</Button>
                                <Button
                                    sx={{ borderRadius: 8, marginRight: "1rem" }}
                                    color='error'
                                    variant="outlined"
                                    value='REJECTED'
                                    onClick={handleFriendRequest}
                                    size="small">DECLINE</Button>
                                <Button
                                    sx={{ borderRadius: 8, marginRight: "1rem" }}
                                    color='error'
                                    variant="outlined"
                                    value='BLOCKED'
                                    onClick={handleFriendRequest}
                                    size="small">BLOCK</Button>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default FriendRequestBox

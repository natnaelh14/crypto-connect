import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { userProps } from '../../index.types';
import { useAppSelector } from '../../app/hooks';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CHECK_FRIENDSHIP, QUERY_FRIEND_REQUEST } from '../../utils/queries';
import { FRIEND_REQUEST } from '../../utils/mutations';
import Avatar from "@material-ui/core/Avatar";
import noAvatar from '../../img/no-avatar.png';

type userInfoProps = {
    id: string,
    handle: string,
    avatar: string,
    isActive: string,
    userRefetch: () => void,
    whoToRefetch: () => void
};

const WhoToFollowSmall = ({ id, handle, avatar, isActive, userRefetch, whoToRefetch }: userInfoProps) => {
    const currentUser = useAppSelector(state => state.currentUser)
    const { error, loading, user } = currentUser
    const userInfo: userProps = user
    const { error: checkFriendError, loading: checkFriendLoading, data: checkFriendData, refetch: checkRefetch } = useQuery(QUERY_CHECK_FRIENDSHIP, {
        variables: {
            follower: userInfo.id,
            followed: id
        }
    })
    const { error: friendRequestError, loading: friendRequestLoading, data: friendRequestData, refetch: queryFriendRefetch } = useQuery(QUERY_FRIEND_REQUEST, {
        variables: {
            receiver_id: id,
            sender_id: userInfo.id
        }
    })

    const [followRequest, { }] = useMutation(FRIEND_REQUEST)
    const handleFollowRequest = async () => {
        try {
            await followRequest({
                variables: {
                    sender_id: userInfo.id,
                    receiver_id: id
                }
            }).then(() => {
                userRefetch()
                whoToRefetch()
                checkRefetch()
                queryFriendRefetch()

            })
        } catch (e) {
            return e;
        }
    }

    const theme = useTheme();
    return (
        <Box margin="1rem 0">
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }} >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Grid sx={{ paddingRight: "12px" }}>
                        <NavLink to={`/home/profile/${id}`}>
                            <Avatar style={{ height: "50px", width: "50px" }} alt="recommended-user" src={avatar ? avatar : noAvatar} />
                        </NavLink>
                    </Grid>
                    <Grid container alignItems="center" mt='0.5rem' >
                        <Grid item>
                            <Typography ml='0.1rem' fontFamily='inherit' sx={{ fontSize: "13px", fontWeight: "500" }}>
                                {handle}
                            </Typography>
                            <Typography ml='0.1rem' fontFamily='inherit' sx={{ fontSize: "11px", fontWeight: "500" }}>
                                @{handle.trim().replace(/ /g, '').toLowerCase()}
                            </Typography>
                            </Grid>
                    </Grid>
                </Box>
                <Box mt='0.5rem' ml='auto'>
                    {checkFriendData?.checkFriendship ? (
                        <Button
                            size="small"
                            disabled={true}
                            onClick={handleFollowRequest}
                            sx={{
                                borderRadius: theme.shape.borderRadius,
                                textTransform: "capitalize",
                                fontFamily: 'inherit',
                                fontSize: '10px',
                                mt: "4px",
                                background: "black",
                                "&:hover": {
                                    background: "#333",
                                },
                            }}
                            variant="contained"
                        >
                            FOLLOWING
                        </Button>
                    ) : (userInfo.id === id || friendRequestData?.friendRequest?.status === 'BLOCKED') ? (
                        <div />
                    ) : (friendRequestData?.friendRequest?.status === 'PENDING') ? (
                        <Button
                            size="small"
                            disabled={true}
                            onClick={handleFollowRequest}
                            sx={{
                                borderRadius: theme.shape.borderRadius,
                                textTransform: "capitalize",
                                fontFamily: 'inherit',
                                fontSize: '10px',
                                mt: "4px",
                                background: "black",
                                "&:hover": {
                                    background: "#333",
                                },
                            }}
                            variant="contained"
                        >
                            PENDING
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            disabled={false}
                            onClick={handleFollowRequest}
                            sx={{
                                borderRadius: theme.shape.borderRadius,
                                textTransform: "capitalize",
                                fontFamily: 'inherit',
                                fontSize: '10px',
                                mt: "4px",
                                background: "black",
                                "&:hover": {
                                    background: "#333",
                                },
                            }}
                            variant="contained"
                        >
                            FOLLOW
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default WhoToFollowSmall
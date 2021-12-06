import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link as RouteLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Post from "../Post/Post.component";
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_POSTS, QUERY_CHECK_FRIENDSHIP, QUERY_FOLLOWERS, QUERY_FOLLOWINGS, QUERY_FRIEND_REQUEST } from '../../utils/queries';
import { REMOVE_FOLLOWING, FRIEND_REQUEST } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
const Moment = require('moment')
import { userProps } from "../../index.types";
import CryptoDoughnut from "../CryptoDoughnut/crypto_doughnut.component";
import { useAppSelector } from '../../app/hooks';
import { GuestDataContainer, CryptoCarouselContainer, GuestUserInfoContainer, UserBioContainer } from './guest_profile.styles';
import GuestProfileLoading from './guest_profile_loading.component';

const GuestProfile = () => {
    const history = useHistory();
    const { profileId } = useParams<{ profileId: string | undefined }>();
    const currentUser = useAppSelector(state => state.currentUser)
    const { error: currentUserError, loading: currentUserLoading, user } = currentUser
    const userInfo: userProps = user
    if (profileId === userInfo.id) {
        history.push("/home/profile");
    }
    if (profileId) {
        var { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_USER, {
            variables: {
                id: profileId
            },
        });
        var { loading: postsLoading, error: postsError, data: postsData } = useQuery(QUERY_POSTS, {
            variables: {
                user_id: profileId
            },
        });
        var { error: followerError, loading: followerLoading, data: followerData } = useQuery(QUERY_FOLLOWERS, {
            variables: {
                id: userInfo.id
            }
        });
        var { error: followingError, loading: followingLoading, data: followingData } = useQuery(QUERY_FOLLOWINGS, {
            variables: {
                id: userInfo.id
            }
        });
    }

    if (profileId && userInfo) {
        var { data: checkFriendData } = useQuery(QUERY_CHECK_FRIENDSHIP, {
            variables: {
                follower: userInfo.id,
                followed: profileId
            }
        })
        var { data: checkFriendRequestData } = useQuery(QUERY_FRIEND_REQUEST, {
            variables: {
                sender_id: userInfo.id,
                receiver_id: profileId
            }
        })
    }

    const [removeFollowing, { }] = useMutation(REMOVE_FOLLOWING)
    const handleRemoveFollowing = async () => {
        try {
            await removeFollowing({
                variables: {
                    follower_user_id: userInfo.id,
                    followed_user_id: profileId
                }
            })
        } catch (e) {
            return e;
        }
    }
    const [followRequest, { }] = useMutation(FRIEND_REQUEST)
    const handleFollowRequest = async () => {
        try {
            await followRequest({
                variables: {
                    sender_id: userInfo.id,
                    receiver_id: profileId
                }
            })
        } catch (e) {
            return e;
        }
    }

    let pending = userLoading || userError || postsLoading || postsError || followerError || followerLoading || followingError || followingLoading

    return (
        <div style={{ width: '75%', margin: '20px' }}>
            {(pending) && (
                <GuestProfileLoading />
            )}
            {(userData?.userProfile && checkFriendRequestData && checkFriendData) && (
                <Fade in={true} timeout={1000}>
                    <div style={{ padding: '20px' }}>
                        <Box borderBottom="1px solid #ccc" padding="8px 20px">
                            <Grid container alignItems="center">
                                <Grid item sx={{ mr: "10px" }}>
                                    <RouteLink to="/">
                                        <IconButton>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </RouteLink>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        {userData?.userProfile?.handle}
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px", color: "#555" }}>
                                        {postsData?.posts ? postsData?.posts.length : 0} posts
                                    </Typography>{" "}
                                </Grid>
                            </Grid>
                        </Box>
                        <GuestDataContainer>
                            <GuestUserInfoContainer>
                                <Box padding="10px 20px" display="flex" alignItems="center" sx={{ flexDirection: 'column' }}>
                                    <img width="100px" src={userData?.userProfile?.avatar} alt="profile" />
                                    {checkFriendData?.checkFriendship ? (
                                        <Button
                                            onClick={handleRemoveFollowing}
                                            size="small"
                                            sx={{
                                                textTransform: "capitalize",
                                                padding: "6px 20px",
                                                marginTop: '5px',
                                                background: "black",
                                                "&:hover": {
                                                    background: "#333",
                                                },
                                            }}
                                            variant="contained"
                                        >
                                            UNFOLLOW
                                        </Button>
                                    ) : (checkFriendRequestData?.friendRequest?.status === "PENDING") ? (
                                        <Button
                                            size="small"
                                            disabled={true}
                                            sx={{
                                                textTransform: "capitalize",
                                                padding: "6px 20px",
                                                marginTop: '5px',
                                                background: "black",
                                                "&:hover": {
                                                    background: "#333",
                                                },
                                            }}
                                            variant="contained"
                                        >
                                            PENDING
                                        </Button>
                                    ) : (checkFriendRequestData?.friendRequest?.status === "BLOCKED") ? (
                                        <div>BLOCKED</div>
                                    ) : (
                                        <Button
                                            size="small"
                                            onClick={handleFollowRequest}
                                            sx={{
                                                textTransform: "capitalize",
                                                padding: "6px 20px",
                                                marginTop: '5px',
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
                                    <Typography textAlign='center' variant="h6" sx={{ fontWeight: "500" }}>
                                        {userData?.userProfile?.handle}
                                    </Typography>
                                    <Typography textAlign='center' sx={{ fontSize: "14px", color: "#555" }}>
                                        @{userData?.userProfile?.handle.trim().toLowerCase()}
                                    </Typography>
                                    <Box display="flex">
                                        <LocationOnIcon htmlColor="#555" />
                                        <Typography textAlign='center' sx={{ ml: "6px", color: "#555" }}>
                                            {userData?.userProfile?.city}, {userData?.userProfile?.state}, {userData?.userProfile?.country}
                                        </Typography>
                                    </Box>
                                    <Box display="flex">
                                        <DateRangeIcon htmlColor="#555" />
                                        <Typography sx={{ ml: "6px", color: "#555" }}>
                                            {Moment(userData?.userProfile?.birth_date).format('MMMM Do YYYY')}
                                        </Typography>
                                    </Box>
                                </Box>
                                <UserBioContainer>
                                    <Typography fontSize="16px" color="#333" padding="10px 0">
                                        {userData?.userProfile?.bio}
                                    </Typography>
                                    <Box display="flex" marginTop='0.25rem'>
                                        <Typography color="#555" marginRight="1rem">
                                            <strong style={{ color: "black" }}>
                                                {`${followingData?.followings.length} `}
                                            </strong>
                                            Following
                                        </Typography>
                                        <Typography color="#555" marginRight="1rem">
                                            <strong style={{ color: "black" }}>
                                                {`${followerData?.followers.length} `}
                                            </strong>
                                            Followers
                                        </Typography>
                                    </Box>
                                    <Box display="flex" marginTop='0.25rem'>
                                        <Typography color="#555">Member Since {Moment(userData?.userProfile?.created_at).format('YYYY')}</Typography>
                                    </Box>
                                </UserBioContainer>
                            </GuestUserInfoContainer>
                            <CryptoCarouselContainer>
                                {(userData?.userProfile?.id && checkFriendData?.checkFriendship) && (
                                    <CryptoDoughnut currentUser={userData?.userProfile?.id} />
                                )}
                            </CryptoCarouselContainer>
                        </GuestDataContainer>
                        <Box sx={{ overflowY: "scroll" }} >
                            <Box borderBottom="1px solid #ccc">
                                <Typography
                                    display="inline-block"
                                    variant="caption"
                                    fontSize="16px"
                                    marginX="1rem"
                                    padding="6px 0"
                                    fontWeight="500"
                                    borderBottom={`4px solid black`}
                                >
                                    Posts
                                </Typography>
                            </Box >
                            {(postsData?.posts && checkFriendData?.checkFriendship) &&
                                postsData?.posts.map((post: any) => {
                                    return <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />
                                }
                                )
                            }
                        </Box>
                    </div>
                </Fade>
            )}

            {/* {openModal && (
                <Modal
                    open={openModal}
                    handleClose={handleModalClose}
                >
                    <UpdateUserProfile />
                </Modal>
            )} */}
        </div>
    );
}

export default GuestProfile;
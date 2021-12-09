import React, { useEffect } from "react";
import { Box, typography } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link as RouteLink } from "react-router-dom";
const Moment = require('moment')
import { Fade } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { userProps } from '../index.types';
import Post from "../components/Post/Post.component";
import UpdateUserProfile from "../components/UpdateUserProfile/update_user_profile.component";
import { QUERY_FOLLOWERS, QUERY_FOLLOWINGS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import FollowModal from "../components/FollowModal/follow_modal.component";
import cover from '../img/cover.jpeg';
import { ProfileContainer } from './styles/profile_page.styles';
import ProfilePageLoading from './loading/profile_page.loading';
import noAvatar from '../img/no-avatar.png';
import Avatar from "@material-ui/core/Avatar";

const moodObj = (currentMood: string) => {
    switch (currentMood) {
        case 'HAPPY':
            return '😀';
        case 'SAD':
            return '😔';
        case 'EXCITED':
            return '😃';
        case 'AMUSED':
            return '🙂';
        case 'OPTIMISTIC':
            return '😊';
        case 'FRUSTRATED':
            return '😩';
        default:
            return "";
    }
}

const Profile = () => {

    const currentUser = useAppSelector(state => state.currentUser)
    const { error: currentUserError, loading: currentUserLoading, user } = currentUser
    const userInfo: userProps = user

    const postList = useAppSelector((state) => state.postList)
    const { error: postsError, loading: postsLoading, posts } = postList
    let postData: Array<{
        id: number,
        user_id: string,
        text: string,
        created_at: Date
    }> = posts
    let postsData = [...postData].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));

    const { error: followerError, loading: followerLoading, data: followerData } = useQuery(QUERY_FOLLOWERS, {
        variables: {
            id: userInfo.id
        },
        pollInterval: 1000
    });
    const { error: followingError, loading: followingLoading, data: followingData } = useQuery(QUERY_FOLLOWINGS, {
        variables: {
            id: userInfo.id
        },
        pollInterval: 1000
    });

    if (followerData && followingData) {
        var { followers } = followerData;
        var { followings } = followingData;
    }

    const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
    const [openFollowingModal, setOpenFollowingModal] = React.useState(false);
    const [openFollowerModal, setOpenFollowerModal] = React.useState(false);
    const handleModalClose = () => {
        setOpenUpdateModal(false)
        setOpenFollowingModal(false)
        setOpenFollowerModal(false)
    };

    let pending = currentUserLoading || followerLoading || followingLoading || postsLoading || followingError || followerError || postsError || currentUserError
    let currentMood = userInfo?.status
    return (
        <ProfileContainer>
            {(pending) && (
                <ProfilePageLoading />
            )}
            {/* {(userInfo && followerData && followingData) && ( */}
            <Fade in={true} timeout={1000}>
                <div style={{ padding: '20px' }}>
                    <Box>
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
                                    <Typography fontFamily='inherit' variant="h6">
                                        {userInfo?.handle}
                                    </Typography>
                                    <Typography fontFamily='inherit' sx={{ fontSize: "12px", color: "#555" }}>
                                        {postsData ? postsData?.length : 0} posts
                                    </Typography>{" "}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box height="90vh" sx={{ overflowY: "scroll" }}>
                            <Box position="relative">
                                <img
                                    width="100%"
                                    height='300px'
                                    src={cover}
                                    alt="background"
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 120,
                                        left: 15,
                                        background: "#eee",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <Avatar style={{ width: "150px", height: "150px" }} alt="profile-image" src={userInfo?.avatar ? userInfo?.avatar : noAvatar} />
                                </Box>
                            </Box>
                            <Box textAlign="right" padding="10px 20px">
                                <Button
                                    onClick={() => setOpenUpdateModal(!openUpdateModal)}
                                    size="small"
                                    sx={{
                                        textTransform: "capitalize",
                                        padding: "6px 20px",
                                        background: "black",
                                        fontFamily: 'inherit',
                                        "&:hover": {
                                            background: "#333",
                                        },
                                    }}
                                    variant="contained"

                                >
                                    UPDATE
                                </Button>
                            </Box>
                            <Box padding="10px 20px">
                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                    <Typography fontFamily='inherit' variant="h6" mr="0.5rem" sx={{ fontWeight: "500" }}>
                                        {userInfo?.handle}
                                    </Typography>
                                    {userInfo?.status && (
                                        <Typography fontFamily='inherit' variant="h6" sx={{ fontWeight: "500" }}>
                                            ({`${userInfo?.status} ${moodObj(currentMood)}`})
                                        </Typography>
                                    )}
                                </Box>
                                {userInfo?.handle && (
                                    <Typography fontFamily='inherit' sx={{ fontSize: "14px", color: "#555" }}>
                                        {`@${userInfo?.handle?.trim().replace(/ /g,'').toLowerCase()}`}
                                    </Typography>
                                )}
                                <Typography fontFamily='inherit' fontSize="16px" color="#333" padding="10px 0">
                                    {userInfo?.bio}
                                </Typography>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    padding="6px 0"
                                    flexWrap="wrap"
                                >
                                    {(userInfo?.city || userInfo?.state || userInfo?.country) && (
                                        <Box display="flex">
                                            <LocationOnIcon htmlColor="#555" />
                                            <Typography fontFamily='inherit' sx={{ ml: "6px", color: "#555" }}>
                                                {userInfo?.city}, {userInfo?.state}, {userInfo?.country}
                                            </Typography>
                                        </Box>
                                    )}
                                    {userInfo?.birth_date && (
                                        <Box display="flex" marginLeft="1rem">
                                            <DateRangeIcon htmlColor="#555" />
                                            <Typography fontFamily='inherit' sx={{ ml: "6px", color: "#555" }}>
                                                {Moment(userInfo?.birth_date).format('MMMM Do YYYY')}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box display="flex" marginTop='1rem'>
                                    <Box
                                        onClick={() => setOpenFollowingModal(!openFollowingModal)}
                                        sx={{
                                            "&:hover": {

                                                textDecoration: "underline",
                                                cursor: "pointer",
                                                fontWeight: "bold"
                                            },
                                        }}
                                    >
                                        <Typography fontFamily='inherit' color="#555" marginRight="1rem">
                                            <strong style={{ color: "black" }}>
                                                {`${followings?.length} `}
                                            </strong>
                                            Following
                                        </Typography>
                                    </Box>
                                    <Box
                                        onClick={() => setOpenFollowerModal(!openFollowerModal)}
                                        sx={{
                                            "&:hover": {
                                                textDecoration: "underline",
                                                cursor: "pointer",
                                                fontWeight: "bold"
                                            },
                                        }}
                                    >
                                        <Typography fontFamily='inherit' color="#555" marginRight="1rem">
                                            <strong style={{ color: "black" }}>
                                                {`${followers?.length} `}
                                            </strong>
                                            Followers
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" marginTop='1rem'>
                                    <Typography fontFamily='inherit' color="#555" marginRight="1rem">Member Since {Moment(userInfo.created_at).format('YYYY')}</Typography>
                                </Box>
                            </Box>
                            <Box borderBottom="1px solid #ccc">
                                <Typography
                                    display="inline-block"
                                    variant="caption"
                                    fontSize="16px"
                                    marginX="1rem"
                                    padding="6px 0"
                                    fontWeight="500"
                                    fontFamily='inherit'
                                    borderBottom={`4px solid black`}
                                >
                                    POSTS
                                </Typography>
                            </Box>
                            <Box>
                                {postsData &&
                                    postsData.map((post) => <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />)}
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Fade>
            {/* // )} */}
            {openUpdateModal && (
                <UpdateUserProfile
                    open={openUpdateModal}
                    handleClose={handleModalClose}
                />
            )}
            {openFollowingModal && (
                <FollowModal
                    open={openFollowingModal}
                    handleClose={handleModalClose}
                    follow={followings}
                    title="Following"
                    action='Following'
                />
            )}
            {openFollowerModal && (
                <FollowModal
                    open={openFollowerModal}
                    handleClose={handleModalClose}
                    follow={followers}
                    title='Followers'
                    action='Remove'
                />
            )}
        </ProfileContainer>
    );
}

export default Profile;